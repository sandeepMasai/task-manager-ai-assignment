/**
 * Vite config: proxy /api to backend so React API calls hit http://localhost:5000
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://task-manager-ai-assignment-6lqr.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
