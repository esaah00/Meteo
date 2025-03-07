import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      manifest: {
        id: "/",
        name: "WeatherApp",
        short_name: "WeatherA",
        description: "Latest weather update",
        theme_color: "#646cff",
        icons: [
          {
            src: "weather.jpg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "weather.jpg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 2029,
  },
});
