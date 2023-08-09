import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import svgr from "vite-plugin-svgr";
import path from "path"; // Don't forget to import 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [
    react(),
    federation({
      name: "shared",
      filename: "shared.js",
      exposes: {
        // example
        "./Login": "./src/components/auth/SignIn.tsx",
      },
      shared: ["react", "react-dom"],
    }),
    svgr(),
  ],
  preview: {
    host: "localhost",
    port: 5000,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },

  // define: {
  //   "process.env": {
  //     REACT_APP_AUTH_URL: "https://tenx-backen-testing.e-butler.com/v1",
  //   },
  // },
});
