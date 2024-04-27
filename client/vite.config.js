import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupTests.js',
    include: [
      './src/tests/unit/**/*.test.{js,jsx}',
      './src/tests/integration/**/*.integration.test.{js,jsx}',
    ]
  },
})
