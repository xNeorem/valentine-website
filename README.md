# For My Valentine ❤️

I created this website for someone very special. Many of the interactions, photos, and phrases in this project hold a deep and personal meaning to me.

If you'd like to use this project for your own special someone, follow the instructions below to customize it.

## 🚀 How to Customize

All major configurations can be found in `src/App.jsx`.

### 1. Change the Name
Look for the `PARTNER_NAME` constant at the top of the file and enter your special someone's name:
```javascript
const PARTNER_NAME = "Name";
```

### 2. Add Your Photos
1. Upload your photos to the `public/images/` folder.
2. Modify the `memories` array in `src/App.jsx` by entering your image paths and captions:
```javascript
const memories = [
  { id: 1, url: "/images/your_photo.jpg", caption: "Our moment 📸" },
  // ... add as many as you like
];
```

### 3. Customize "No" Phrases
If you want to change the funny phrases that appear when someone clicks "No", modify the `PROPOSAL_PHRASES` array:
```javascript
const PROPOSAL_PHRASES = [
  "No",
  "Are you sure?",
  // ... add your own phrases
];
```

## 🛠️ Local Development

To test your changes locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

If you prefer using **Podman**:
```bash
podman run --rm -p 5173:5173 -v ".:/app" -w "/app" node:lts npm run dev -- --host
```

## ✨ Features
- **Interactive Envelope**: A sweet introduction that opens upon clicking.
- **Memory Slider**: A draggable "card stack" photo gallery.
- **Dynamic Proposal**: A "No" button that runs away and a "Yes" button that grows proportionally.
- **Personalized Success Message**: Based on how many times "No" was pressed.

---
Made with ❤️ using React + Vite + Framer Motion. 🌹
