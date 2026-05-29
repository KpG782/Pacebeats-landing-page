// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Canonical origin — powers Astro.site, canonical URLs, OG/Twitter absolute
  // URLs, and the generated sitemap. Must match the production domain.
  site: "https://www.pacebeats.top",
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

  integrations: [react(), sitemap()],
});
