import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const base = process.env.GITHUB_PAGES === 'true' ? '/monica-howe-studio-site/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
