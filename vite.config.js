import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project site lives under /monica-howe-studio-site/
// SiteGround / local builds keep root `/`.
const base = process.env.GITHUB_PAGES === 'true' ? '/monica-howe-studio-site/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
