import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL?.replace(/\/$/, '') ?? '';
  const base = env.VITE_BASE_PATH || '/';

  const portfolioMetadataPlugin: Plugin = {
    name: 'portfolio-metadata',
    transformIndexHtml(html) {
      if (!siteUrl) {
        return html
          .split('\n')
          .filter(line => !line.includes('data-requires-site-url'))
          .join('\n');
      }

      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll(' data-requires-site-url', '');
    },
  };

  return {
    base,
    plugins: [react(), tailwindcss(), portfolioMetadataPlugin],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
