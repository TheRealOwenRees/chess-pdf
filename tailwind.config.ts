import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    logs: false,
    themes: [
      {
        lightTheme: {
          primary: "#6f884d",
          "primary-content": "#ffffff",
          secondary: "#B8B666",
          "secondary-content": "#9fae8f",
          accent: "#00d7c0",
          "accent-content": "#00110e",
          neutral: "#4B5563",
          "neutral-content": "#d7dde4",
          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          "base-300": "#e5e6e6",
          "base-content": "#1f2937",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
