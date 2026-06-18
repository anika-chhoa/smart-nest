module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],

  theme: {
    extend: {
      colors: {

        /* ===== CORE ===== */
        background: "var(--background)",
        surface: "var(--surface)",

        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",

        /* ===== TEXT ===== */
        foreground: "var(--on-background)",
        muted: "var(--on-surface-variant)",

        /* ===== SURFACES ===== */
        card: "var(--surface-container)",
        border: "var(--outline)",

        /* ===== ACCENT ===== */
        champagne: "var(--champagne-accent)",

        /* ===== GLASS ===== */
        glass: "var(--glass-bg-light)",

        /* ===== STATUS ===== */
        danger: "var(--error)",
      },

      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },

      fontFamily: {
        body: ["Hanken Grotesk", "sans-serif"],
        heading: ["EB Garamond", "serif"],
      },
    },
  },

  plugins: [],
};