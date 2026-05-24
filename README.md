<h1 style="display: flex; align-items: center; gap: 1.5rem;"><img src="https://www.pngmart.com/files/23/Bmo-PNG-Transparent.png" alt="BMO" width="60"/> The BMO Stack</h1>

#### (Bare Metal on Obsidian)


A minimal, custom Vite template that allows you to write a TS, CSS, and HTML project that will bundle to a single HTML file application viewable on Obsidian (mobile and desktop) with the [HTML reader plugin](https://community.obsidian.md/plugins/obsidian-html-plugin).

## Usage

```bash
npx degit cr4z/bmo my-app
cd my-project
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a standalone `dist/index.html` with all assets inlined.

### Obsidian

Set `OUT_DIR` and `FILENAME` in `.env` to auto-copy and name the built single-file HTML into a specified directory, assumed within your Obsidian vault.
