import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Couleur d'accent de la marque : vert signal type cyclisme performance
        accent: {
          DEFAULT: "#C8FF3D",
          foreground: "#12130F",
        },
        // Charbon profond utilisé en mode sombre / textes forts
        charcoal: "#12130F",
      },
      fontFamily: {
        // Police à forte personnalité pour les titres
        display: ["var(--font-display)"],
        // Police lisible pour le corps de texte
        sans: ["var(--font-geist-sans)"],
      },
    },
  },
  plugins: [],
};
export default config;
