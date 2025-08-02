// tailwind.config.ts or tailwind.config.js
import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust based on your structure
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",       // white
        primary: "#1E3A8A",          // Indigo-900
        accent: "#06B6D4",           // Cyan-400
        text: "#111827",             // Gray-900
        cta: "#F97316",              // Orange-500
      },
    },
  },
  plugins: [],
};
export default config;
