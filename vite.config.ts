import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For local development without vercel dev, you can use:
//   vercel dev   → runs both frontend and api on http://localhost:3000
// Or run vite + node server separately (legacy mode).
export default defineConfig({
  plugins: [react()],
});
