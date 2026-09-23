# Typing Tip - Professional Typing Speed & Accuracy Platform

Typing Tip is a complete, mobile-friendly, 100% free static typing proficiency website featuring English and Urdu typing tests, adaptive practice modes, daily challenges, typing arcade games, a standardized WPM calculator, and high-resolution downloadable certificates.

---

## Key Features

1. **Typing Test**:
   - Timed tests: 30 seconds, 1 minute, 3 minutes, 5 minutes
   - Real-time Gross WPM, Net WPM, Accuracy (%), and error counts
   - Real-time character-by-character color-coded feedback
   - Final score breakdown with downloadable certificates

2. **Typing Practice**:
   - Beginner, Intermediate, Advanced levels
   - Random words, Sentences, and Paragraphs
   - English and Urdu support

3. **English & Urdu Typing (RTL)**:
   - Authentic English prose and high-frequency N-grams
   - Authentic Urdu words, sentences, and paragraphs with native RTL display
   - Interactive Urdu Phonetic Keyboard Guide showing QWERTY mappings

4. **Daily Challenge**:
   - Fresh deterministic typing challenge every day with streak tracking

5. **Typing Arcade Games**:
   - Speed Challenge (Word Rush)
   - Accuracy Challenge (Precision Striker)
   - 60-Second Challenge (Blitz Sprint)

6. **WPM Calculator**:
   - Separate tool calculating Gross WPM, Net WPM, and accuracy with standard formulas

7. **Downloadable Certificate**:
   - Interactive HTML5 canvas generator with recipient name, verified WPM, accuracy, and official seal (high-res PNG download)

8. **Progress Dashboard**:
   - Best WPM, Average WPM, Best Accuracy, Total tests, and test history saved locally in `localStorage`

9. **SEO-Friendly Typing Guides & Biomechanics**:
   - Finger placement diagram, speed tactics, touch typing rules

---

## Deploying to Cloudflare Pages (Free & Simple)

Typing Tip is built as a pure static single-page application (SPA) with no server dependencies or paid APIs. It can be deployed to Cloudflare Pages for free in under 2 minutes:

### Option 1: Via GitHub / GitLab (Recommended for Automatic Deployments)

1. Push this repository to your **GitHub** or **GitLab** account.
2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
3. Click **Create Application** > **Pages** > **Connect to Git**.
4. Select your `typingtip` repository.
5. In the **Build configuration** settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Click **Save and Deploy**.
7. Cloudflare Pages will build and deploy your site globally to a free `*.pages.dev` URL!

---

### Option 2: Direct Upload (Drag & Drop or Wrangler CLI)

If you prefer deploying without connecting Git:

1. Build the production files locally:
   ```bash
   npm run build
   ```
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), go to **Workers & Pages** > **Create Application** > **Pages** > **Upload assets**.
3. Name your project (e.g., `typingtip`) and drag-and-drop the generated `dist` folder into the upload box.
4. Click **Deploy Site**.

---

### Local Development

To run the development server locally:

```bash
# Install dependencies
npm install

# Start Vite dev server on port 3000
npm run dev

# Build for production
npm run build
```

---

## Technology Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Dark-Blue Theme)
- **Icons**: Lucide React
- **Persistence**: HTML5 Web Storage (`localStorage`)
- **Certificate Engine**: HTML5 Canvas 2D API (1600x1100 px print resolution)
