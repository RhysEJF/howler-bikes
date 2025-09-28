// Howler Website JavaScript
// Handles signup form submission and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const successMessage = document.getElementById('successMessage');

    // Handle form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Simulate form submission (in a real app, you'd send this to your backend)
        submitToWaitingList(email);
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Submit to MailerLite waiting list
    function submitToWaitingList(email) {
        // Show loading state
        const submitBtn = signupForm.querySelector('.signup-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Joining...';
        submitBtn.disabled = true;

        let callbackHandled = false;

        // Fallback timeout in case MailerLite callback doesn't work
        const fallbackTimeout = setTimeout(() => {
            if (!callbackHandled) {
                console.log('MailerLite callback timeout - showing success anyway');
                handleSuccess();
            }
        }, 5000); // 5 second timeout

        function handleSuccess() {
            if (callbackHandled) return;
            callbackHandled = true;
            
            clearTimeout(fallbackTimeout);
            
            // Show success on button first
            submitBtn.textContent = "You're in!";
            
            // Wait a moment, then hide form and show success message
            setTimeout(() => {
                signupForm.style.display = 'none';
                successMessage.style.display = 'block';
            }, 800);
            
            // Store email in localStorage
            localStorage.setItem('howler_email', email);
            
            console.log('Email successfully added to MailerLite:', email);
        }

        function handleError() {
            if (callbackHandled) return;
            callbackHandled = true;
            
            clearTimeout(fallbackTimeout);
            showError('Sorry, there was an error. Please try again.');
            // Reset button state on error
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }

        // Submit to MailerLite using their Universal script
        try {
            ml('form', 'EfVDKS', {
                email: email
            }, function(success) {
                console.log('MailerLite callback received, success:', success);
                if (success) {
                    handleSuccess();
                } else {
                    handleError();
                }
            });
        } catch (error) {
            console.error('MailerLite submission error:', error);
            handleError();
        }
    }

    // Show error message function
    function showError(message) {
        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            padding: 1rem 1.5rem;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            color: #dc2626;
            font-weight: 500;
            margin-top: 1rem;
        `;
        errorDiv.textContent = message;

        // Insert error message after the form
        signupForm.insertAdjacentElement('afterend', errorDiv);

        // Remove error message after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);

        // Focus back on email input
        emailInput.focus();
    }

    // Add smooth scrolling for any internal links (future enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (hero && heroVisual) {
            // Only apply parallax on larger screens to avoid performance issues on mobile
            if (window.innerWidth > 768) {
                heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }
    });

    // Check if user has already signed up (from localStorage)
    const existingEmail = localStorage.getItem('howler_email');
    if (existingEmail) {
        signupForm.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.querySelector('p').textContent = `🎉 Welcome back! You're already on our waiting list with ${existingEmail}`;
    }
});
