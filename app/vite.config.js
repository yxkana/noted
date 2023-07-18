import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/notes": "https://noted-api.vercel.app/",
    },
  },
  plugins: [react()],
});
