import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'wxt';
import packageJson from './package.json';

export default defineConfig({
    modules: ['@wxt-dev/module-solid'],
    manifest: {
        name: packageJson.displayName,
        description: packageJson.description,
        permissions: ['storage']
    },
    srcDir: 'src',
    vite: () => ({
        plugins: [
            tailwindcss()
        ]
    }),
})