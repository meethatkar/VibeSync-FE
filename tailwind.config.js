/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        neutral: "var(--color-neutral)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "Inter", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
}
