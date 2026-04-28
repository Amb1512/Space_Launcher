export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f5f2",
        foreground: "#1a1a1a",
        card: "#ffffff",
        primary: "#2f9e84",
        muted: "#6b7280",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.05)",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}
