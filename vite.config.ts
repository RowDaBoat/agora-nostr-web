import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit()
  ],
  define: {
    'global': 'globalThis'
  },
  resolve: {
    conditions: ['svelte', 'browser', 'import', 'default'],
    mainFields: ['svelte', 'browser', 'module', 'jsnext:main', 'jsnext', 'main']
  },
  ssr: {
    noExternal: ['svelte-toolbelt', '@nostr-dev-kit/blossom']
  },
  optimizeDeps: {
    exclude: ['@nostr-dev-kit/cache-sqlite-wasm']
  },
  worker: {
    format: 'es'
  },
  server: {
    port: 5001,
    host: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
    fs: {
      allow: ['..']
    }
  },
  preview: {
    host: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  assetsInclude: ['**/*.wasm'],
});
