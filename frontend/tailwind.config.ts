import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9FAFB", // Gray-50
        primary: "#1E3A8A", // Indigo-900
        accent: "#22D3EE", // Cyan-300
        text: "#111827", // Gray-900
        cta: "#F59E0B", // Amber-500
        textMutedForeground: "#6B7280", // Gray-500
        border: "#E5E7EB", // Gray-200
        "gradient-text": "linear-gradient(to right, #F59E0B, #22D3EE)", // Amber to Cyan gradient
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-to-r-primary": "linear-gradient(to right, #1E3A8A, #22D3EE)",
        "gradient-to-b": "linear-gradient(to bottom, #F9FAFB, #22D3EE14)",
      },
    },
  },
  plugins: [],
};
export default config;