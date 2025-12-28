import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    integrations: [mdx()],

    // Static-first: pre-render everything by default
    output: 'static',

    // Performance optimizations
    build: {
        inlineStylesheets: 'auto',
    },

    // No client-side JavaScript by default
    // Add React integration later for interactive islands
});
