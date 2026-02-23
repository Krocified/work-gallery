import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        modules: {
            // camelCase class names in TS (e.g. styles.navLogo instead of styles['nav-logo'])
            localsConvention: 'camelCase',
        },
    },
    build: {
        // Target modern browsers only — smaller bundles
        target: 'es2020',
        // Inline small assets as data URIs
        assetsInlineLimit: 4096,
    },
});
