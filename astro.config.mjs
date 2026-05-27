// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "motion/react",
        "lucide-react",
      ],
    },
  },

  integrations: [react()],
});
