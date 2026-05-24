<h1 style="display: flex; align-items: center; gap: 1.5rem;"><img src="https://www.pngmart.com/files/23/Bmo-PNG-Transparent.png" alt="BMO" width="60"/> The BMO Stack</h1>

#### (Bare Metal on Obsidian)


A minimal boilerplate for writing TS/CSS/HTML applications of any size, then bundling to a **single** HTML file viewable within Obsidian on mobile and desktop (using the [HTML reader plugin](https://community.obsidian.md/plugins/obsidian-html-plugin)).

## Usage

```bash
npx degit cr4z/bmo my-app
cd my-project
npm install
npm run dev
```

## Build to Obsidian

Specify in your `.env` fields: `OUT_DIR` and `FILENAME`. This will auto-copy the built single file to a specified directory.

```bash
npm run build
```
Outputs a standalone `dist/index.html`, then copies over to a specified location within your vault if `.env` is present with fields. Emits logs to a local `build.log`.
