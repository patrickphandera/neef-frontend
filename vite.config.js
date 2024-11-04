// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Add this line
  ],build: {
    outDir: 'dist', // Ensure this is set to 'dist'
    // Other build options...
  },
  base: '/' 

});
