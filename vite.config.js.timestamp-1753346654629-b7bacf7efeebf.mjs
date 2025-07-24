// vite.config.js
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/app";
var vite_config_default = defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    // force a fixed port
    strictPort: true
    // don't auto-switch
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        // Your main entry point (e.g., home page)
        about: resolve(__vite_injected_original_dirname, "about.html"),
        // Additional HTML pages
        contact: resolve(__vite_injected_original_dirname, "contact.html"),
        products: resolve(__vite_injected_original_dirname, "products.html"),
        addToCart: resolve(__vite_injected_original_dirname, "addToCart.html")
        // Add more entry points for other HTML files as needed
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcuanNcIjsvLyB2aXRlLmNvbmZpZy5qc1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgcG9ydDogNTE3MywgICAgICAgICAvLyBmb3JjZSBhIGZpeGVkIHBvcnRcclxuICAgIHN0cmljdFBvcnQ6IHRydWUgICAgLy8gZG9uJ3QgYXV0by1zd2l0Y2hcclxuICB9LFxyXG5cclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBpbnB1dDoge1xyXG4gICAgICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCBcImluZGV4Lmh0bWxcIiksIC8vIFlvdXIgbWFpbiBlbnRyeSBwb2ludCAoZS5nLiwgaG9tZSBwYWdlKVxyXG4gICAgICAgIGFib3V0OiByZXNvbHZlKF9fZGlybmFtZSwgXCJhYm91dC5odG1sXCIpLCAvLyBBZGRpdGlvbmFsIEhUTUwgcGFnZXNcclxuICAgICAgICBjb250YWN0OiByZXNvbHZlKF9fZGlybmFtZSwgXCJjb250YWN0Lmh0bWxcIiksXHJcbiAgICAgICAgcHJvZHVjdHM6IHJlc29sdmUoX19kaXJuYW1lLCBcInByb2R1Y3RzLmh0bWxcIiksXHJcbiAgICAgICAgYWRkVG9DYXJ0OiByZXNvbHZlKF9fZGlybmFtZSwgXCJhZGRUb0NhcnQuaHRtbFwiKSxcclxuICAgICAgICAvLyBBZGQgbW9yZSBlbnRyeSBwb2ludHMgZm9yIG90aGVyIEhUTUwgZmlsZXMgYXMgbmVlZGVkXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBRnhCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBRTFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sWUFBWTtBQUFBO0FBQUEsRUFDZDtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBTSxRQUFRLGtDQUFXLFlBQVk7QUFBQTtBQUFBLFFBQ3JDLE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUE7QUFBQSxRQUN0QyxTQUFTLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQzFDLFVBQVUsUUFBUSxrQ0FBVyxlQUFlO0FBQUEsUUFDNUMsV0FBVyxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBO0FBQUEsTUFFaEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
