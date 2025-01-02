/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      // Proxy requests starting with `/api` to the backend server
      "/api": {
        target: "http://internal-alb-internal-1721482325.ap-south-1.elb.amazonaws.com/api", // Replace with your backend server
        changeOrigin: true, // Ensures that the host header is changed to match the target
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Rewrite the path if needed
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setup.ts"],
  },
});
