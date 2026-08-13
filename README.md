# Hueloom

A small riso-printed workshop for mixing, editing, and previewing a colour palette — built with React + Vite.

- **01 — Palette**: up to 7 colours, shown as squares that share the row width (add more, they get thinner).
- **02 — Editor**: pick any colour from the palette and change its hex, with the old and new value shown side by side.
- **03 — Preview**: a fixed 7-element mock UI (header, sidebar, sidebar button, text, card, button, card font colour) coloured from your palette, cycling through it if you have fewer than seven. "Randomize style" shuffles which colour lands where; "Restore style" puts them back in palette order.

Your palette is saved to `localStorage`, so it survives a page refresh.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Building for production

```bash
npm run build
npm run preview   # optional: serve the production build locally
```

## Deploying to GitHub Pages

This repo is set up to deploy with [`gh-pages`](https://www.npmjs.com/package/gh-pages).

1. Push this project to a GitHub repository.
2. In `vite.config.js`, set `base` to match your repo name:
   ```js
   base: "/your-repo-name/",
   ```
   (If you're deploying to a custom domain or the root of a Pages site instead, set `base: "/"`.)
3. Run:
   ```bash
   npm run deploy
   ```
   This builds the app and pushes the `dist/` folder to a `gh-pages` branch.
4. In your repo's **Settings → Pages**, set the source to the `gh-pages` branch.

Your site will be live at `https://<your-username>.github.io/<your-repo-name>/`.

## Project structure

```
src/
  App.jsx                  root component, wires state + sections together
  index.css                design system (tokens, panels, buttons, swatches, preview)
  hooks/usePalette.js      palette state, localStorage persistence, preview style-mapping
  utils/color.js           colour math (hex/HSL conversion, naming, contrast, random generation)
  components/
    Sheet.jsx               shared "print sheet" panel (registration marks + misregistered heading)
    RegistrationMark.jsx    small crosshair SVG used at each sheet's corners
    Swatch.jsx               individual palette square with hover info + delete
    PaletteSection.jsx       01 — Palette
    EditorSection.jsx        02 — Editor
    PreviewSection.jsx       03 — Preview
    Toast.jsx                small status toast
```

## License

Use it however you like.
