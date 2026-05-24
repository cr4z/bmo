import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { appendFileSync, copyFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';

function log(msg: string) {
  const ts = new Date().toISOString().slice(0, 19).replace('T', ' ');
  appendFileSync('build.log', `[${ts}] ${msg}\n`);
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    root: 'src',
    build: {
      outDir: '../dist',
    },
    plugins: [
      svelte(),
      viteSingleFile(),
      {
        name: 'deposit-output',
        closeBundle() {
          const outDir = env.OUT_DIR;
          if (!outDir) {
            log('SKIP deposit: no OUT_DIR set');
            return;
          }
          const filename = env.FILENAME || 'index.html';
          const built = resolve(process.cwd(), 'dist', 'index.html');
          if (!existsSync(built)) {
            log('SKIP deposit: built file not found');
            return;
          }
          const dest = resolve(outDir, filename);
          mkdirSync(dirname(dest), { recursive: true });
          copyFileSync(built, dest);
          log(`Deposited to ${dest}`);
        },
      },
      {
        name: 'build-logger',
        buildStart() {
          log('Build starting...');
        },
        writeBundle() {
          log('✓ index.html written to dist/');
        },
        closeBundle() {
          log('Build complete');
        },
      },
    ],
  };
});
