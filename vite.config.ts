import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Dev/preview proxy so the live-market widget works without the nginx layer.
// In production nginx serves the same `/napi/*` routes (see nginx.conf).
const marketProxy = {
  '/napi/kospi': {
    target: 'https://m.stock.naver.com',
    changeOrigin: true,
    rewrite: () => '/api/index/KOSPI/price',
  },
  '/napi/kosdaq': {
    target: 'https://m.stock.naver.com',
    changeOrigin: true,
    rewrite: () => '/api/index/KOSDAQ/price',
  },
  '/napi/usdkrw': {
    target: 'https://api.stock.naver.com',
    changeOrigin: true,
    rewrite: () => '/marketindex/exchange/FX_USDKRW/prices',
  },
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { proxy: marketProxy },
  preview: { proxy: marketProxy },
})
