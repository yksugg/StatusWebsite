import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // The spreadsheet-backed prototype intentionally embeds the generated catalogue JSON.
    chunkSizeWarningLimit: 1600,
  },
});
