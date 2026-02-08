
# Valentine's Day Special Website ❤️

A cute and funny interactive website to ask your special someone to be your Valentine!

## Features

- **Interactive Buttons**: The "No" button runs away and makes the "Yes" button grow.
- **Fun Animations**: Floating hearts and confetti celebration.
- **Made with Love**: Uses React, Vite, Framer Motion, and Canvas Confetti.

## Running with Podman (Development)

To modify and run the site locally using Podman:

1. **Install Dependencies**:
   ```bash
   podman run --rm -v ".:/app" -w "/app" node:lts npm install
   ```

2. **Start Development Server**:
   ```bash
   podman run --rm -p 5173:5173 -v ".:/app" -w "/app" node:lts npm run dev -- --host
   ```
   Open `http://localhost:5173` in your browser.

## Running with Podman (Production)

To build and run the production version:

1. **Build Image**:
   ```bash
   podman build -t valentine-site -f Containerfile .
   ```

2. **Run Container**:
   ```bash
   podman run -p 8080:80 valentine-site
   ```
   Open `http://localhost:8080` to see the final result!

## Customization

- Modify `src/App.jsx` to change texts or add her name!
- Check `src/index.css` for colors and styling.

Enjoy! 💖
