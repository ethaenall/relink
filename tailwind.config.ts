import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        room: "#12110f",
        "room-2": "#1c1b18",
        paper: "#f3ecdf",
        ink: "#1c1915",
        "ink-soft": "#5c564c",
        rule: "#d9d0c0",
        pen: "#9a3412",
        undef: "#b42318",
        resolved: "#1f5c4d",
        cream: "#e8e0d2",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        paper: ["var(--font-paper)", "Georgia", "ui-serif", "serif"],
      },
      boxShadow: {
        page: "0 18px 50px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.4) inset",
      },
    },
  },
  plugins: [],
};
export default config;
