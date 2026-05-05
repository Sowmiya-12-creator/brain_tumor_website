# PBEDS Brain Tumor Detection Website

**"PBEDS Based Deep Learning Approach For Efficient Brain Tumor Detection & Segmentation"**  
Final Year Engineering Project Website — 2024–25

---

## 📁 Project Files

```
pbeds-website/
├── index.html      ← Main HTML structure (10 sections)
├── style.css       ← Full responsive styling + animations
├── script.js       ← Neural canvas, demo, interactions
└── README.md       ← This file
```

---

## 🚀 How to Run

### Method 1 — Open Directly in Browser (Simplest)
No installation needed.

1. Download all 3 files into the **same folder**
2. Double-click `index.html`
3. It will open in your default browser (Chrome, Firefox, Edge)

> ✅ Works 100% offline. All fonts/icons load from CDN (needs internet on first load).

---

### Method 2 — VS Code Live Server (Recommended for Development)

1. Install [VS Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (search "Live Server" by Ritwick Dey)
3. Open the project folder in VS Code
4. Right-click `index.html` → **"Open with Live Server"**
5. Browser auto-opens at `http://127.0.0.1:5500`

> ✅ Auto-reloads on save. Best for editing.

---

### Method 3 — Python HTTP Server

If you have Python installed:

```bash
# Navigate to project folder
cd pbeds-website

# Python 3
python -m http.server 8080

# Python 2 (older)
python -m SimpleHTTPServer 8080
```

Then open: `http://localhost:8080`

---

### Method 4 — Node.js (npx serve)

```bash
# Navigate to project folder
cd pbeds-website

# Run instantly (no install needed if Node.js is installed)
npx serve .
```

Then open: `http://localhost:3000`

---

### Method 5 — Deploy Online (Share with Anyone)

#### Option A: Netlify Drop (Instant, Free)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag your entire project folder onto the page
3. Get a live URL like `https://pbeds-ai.netlify.app`

#### Option B: GitHub Pages
1. Create a GitHub repository
2. Upload all 3 files
3. Go to **Settings → Pages → Deploy from branch (main)**
4. Your site is live at `https://yourusername.github.io/repo-name`

#### Option C: Vercel
```bash
npm install -g vercel
cd pbeds-website
vercel
```

---

## 🖥️ Browser Requirements

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Recommended |
| Firefox | 88+     | ✅ Fully Supported |
| Edge    | 90+     | ✅ Fully Supported |
| Safari  | 14+     | ✅ Supported |
| IE      | Any     | ❌ Not Supported |

---

## 🌐 Internet Dependency

The website uses CDN for:
- **Google Fonts** (Syne + DM Sans typography)
- **Font Awesome 6** (all icons)

> First load requires internet. After caching, works offline.

**To make it fully offline:** Download fonts and icons locally and update the `<link>` tags in `index.html`.

---

## ✨ Features Included

- [x] Loading animation with neural pulse
- [x] Animated neural network background (canvas)
- [x] Dark / Light mode toggle
- [x] Responsive design (mobile + desktop)
- [x] Smooth scroll navigation
- [x] Active section highlight in navbar
- [x] Reveal-on-scroll animations
- [x] MRI scan visual simulation (hero section)
- [x] CNN layer stack diagram
- [x] Interactive demo (drag & drop, fake inference pipeline)
- [x] Animated progress bars & metric circles
- [x] 3D tilt effect on cards
- [x] Cursor particle trail
- [x] Contact form with validation
- [x] Toast notifications
- [x] 10 complete sections with real academic content

---

## 📌 Sections Overview

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Project title, stats, MRI visual, CTA buttons |
| 2 | About | Problem statement, healthcare importance, objectives |
| 3 | Methodology | PBEDS pipeline (6 stages), architecture diagram |
| 4 | Features | 6 feature cards with icons |
| 5 | Tech Stack | 9 technologies + CNN layer visual |
| 6 | Dataset | Dataset table, class distribution bars, sample MRI visuals |
| 7 | Results | Accuracy circles, per-class bars, model comparison table, segmentation visual |
| 8 | Demo | Upload MRI, fake inference pipeline animation, result output |
| 9 | Future | 6 enhancement cards with timelines |
| 10 | Team | Student, college, guide cards + contact form |

---

## 🎨 Customization Guide

### Change Project/Student Details
Open `index.html` and search for:
- `"Student Developer"` → Replace with your name
- `"Project Lead · AI Engineer"` → Replace with your role
- `"B.E. Computer Science & Engineering"` → Your department
- `"student@college.edu"` → Your email
- `"Project Guide"` → Your guide's name
- `"Affiliated to Anna University, Chennai"` → Your university

### Change Colors
Open `style.css`, find `:root {` at the top:
```css
--accent-blue: #3b9eff;    /* Change primary blue */
--accent-purple: #a855f7;  /* Change purple accent */
--accent-cyan: #22d3ee;    /* Change cyan accent */
```

### Change Accuracy Metrics
In `index.html`, find the `<section id="results">` section and update:
- Circle percentages: `style="--pct:98.6"`
- Bar widths: `style="--w:98.6%; --c: ..."`
- Table values directly in the HTML

---

## 📞 Support

For presentation day, open the website in **Chrome** in **fullscreen mode** (`F11`) for best visual impact.

---

*Built with HTML5 · CSS3 · Vanilla JavaScript*  
*No frameworks required — pure frontend, zero dependencies*
