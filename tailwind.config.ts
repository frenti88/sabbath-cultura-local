import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sabbath: {
          red: "var(--sabbath-red, #B5152B)",
          "red-hover": "#cf1832",
          black: "var(--sabbath-black, #2B2B2B)",
          white: "var(--sabbath-white, #F1F1F1)",
          blue: "var(--sabbath-blue, #040A56)",
          purple: "var(--sabbath-purple, #92278F)",
          orange: "var(--sabbath-orange, #D05800)",
          yellow: "var(--sabbath-yellow, #FFC501)",
          bg: "#0B0B0D",
          surface: "#121215",
          "surface-light": "#18181D",
          border: "rgba(255, 255, 255, 0.08)",
          muted: "#94949C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        headline: ["var(--font-archivo-black)", "var(--font-inter-tight)", "Impact", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 24s linear infinite",
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
