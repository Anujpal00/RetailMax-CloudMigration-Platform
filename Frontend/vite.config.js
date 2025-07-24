// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({

  server: {
    host: '0.0.0.0',
    port: 5173,         // force a fixed port
    strictPort: true    // don't auto-switch
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Your main entry point (e.g., home page)
        about: resolve(__dirname, "about.html"), // Additional HTML pages
        contact: resolve(__dirname, "contact.html"),
        products: resolve(__dirname, "products.html"),
        addToCart: resolve(__dirname, "addToCart.html"),
        // Add more entry points for other HTML files as needed
      },
    },
  },
});
