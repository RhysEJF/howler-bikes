# Howler - Titanium Bike Brand Website

A responsive one-page website for Howler, a titanium bike brand built for anything.

## Features

- 🎨 Modern, responsive design that works on all devices
- 📧 Email signup form for waiting list
- ⚡ Lightweight and fast loading
- 🎯 Clean, professional aesthetic
- 📱 Mobile-first responsive design

## Quick Start

### Option 1: Python Server (Recommended)
```bash
# Navigate to the project directory
cd /Users/rhysfishernewairblack/howler

# Run the development server
python3 server.py
```

The website will automatically open in your browser at `http://localhost:8000`

### Option 2: Simple Python HTTP Server
```bash
# Navigate to the project directory
cd /Users/rhysfishernewairblack/howler

# Start a simple HTTP server
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Live Server (VS Code Extension)
If you have the Live Server extension in VS Code:
1. Right-click on `index.html`
2. Select "Open with Live Server"

## Project Structure

```
howler/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── server.py           # Development server script
└── README.md           # This file
```

## Website Sections

1. **Navigation** - Clean header with Howler branding
2. **Hero Section** - Main headline and email signup form
3. **Features** - Three key selling points about titanium bikes
4. **Footer** - Simple footer with copyright

## Email Signup

The signup form includes:
- Email validation
- Success/error messaging
- Local storage to remember signups
- Responsive design for all screen sizes

## Customization

To customize the website:
- **Colors**: Edit the CSS variables in `styles.css`
- **Content**: Update text in `index.html`
- **Styling**: Modify styles in `styles.css`
- **Functionality**: Add features in `script.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized for fast loading
- Minimal dependencies (only Google Fonts)
- Efficient CSS and JavaScript
- Responsive images and layouts
