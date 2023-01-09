import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import bundleAnalyzer from 'rollup-plugin-bundle-analyzer'

export default defineConfig({
  plugins: [
    bundleAnalyzer(),
    vue(),
    viteStaticCopy({
      targets: [
        { src: './server.js', dest: '' },
        { src: './db.json', dest: '' },
      ],
    }),
  ],
})
