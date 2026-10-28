import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// Identifies this build. Baked into every page and into /version.json so open
// tabs can detect that a newer deploy exists and reload themselves.
const buildId = String(Date.now());

// https://astro.build/config
export default defineConfig({
  site: 'https://www.rathlouskolensstøtteforening.dk',
  output: 'static',
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.BUILD_ID': JSON.stringify(buildId),
    },
  },
  integrations: [
    react(),
    keystatic(),
  ],
});
