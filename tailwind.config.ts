import type { Config } from "tailwindcss";

const config: Config = {
  plugins: [require("tailwind-scrollbar")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "background-gradient":
          "radial-gradient(22.02% 38.94% at 42.77% 48.74%, rgba(16, 23, 36, 0.65) 0%, #FFFFFF 100%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "active-tab": "rgba(49, 131, 255, 0.10)",
        "active-tab-font": "#3183FF",
        "black-main": "#0E1420",
        "black-dark": "#080814",
        "black-light": "#161B27",
        "black-lighter-1": "#232934",
        "black-lighter-2": "#2A303A",
        "light-blur-5": "rgba(255, 255, 255, 0.05)",
        "blur-dark-3": "rgba(0, 0, 0, 0.3)",
        "blur-dark-6": "rgba(0, 0, 0, 0.6)",
        "blur-dark-12": "rgba(0, 0, 0, 0.12)",
        "blur-dark-20": "rgba(0, 0, 0, 0.20)",
        "blur-dark-50": "rgba(14, 20, 32, 0.50)",
        "blur-dark-60": "rgba(0, 0, 0, 0.60)",
        "blur-grey-50": "rgba(14, 20, 32, 0.20)",
        "blue-main": "#4688D4",
        "blue-dark": "#1D2B41",
        "blue-40": "rgba(70, 136, 212, 0.40)",
        "blue-06": "rgba(99, 162, 255, 0.06)",
        "blue-light": "#5E9FF2",
        "blue-bright": "#3183FF",
        "blue-bright-10": "rgba(49, 131, 255, 0.10)",
        "button-primary-color": "#0D8E68",
        "button-blue": "#141B2B",
        "button-primary-color-hover": "#0A7153",
        "button-secondary-color": "rgba(255, 255, 255, 0.1)",
        "button-secondary-color-hover": "rgba(255, 255, 255, 0.4)",
        "dark-blue": "rgba(241, 247, 250, 0.03);",
        "dark-gray": "rgba(218, 220, 227, 0.30);",
        "grey-lightest": "#F1F7FA",
        "grey-light": "#D5E2E8",
        "grey-normal": "#93A3B2",
        "grey-medium": "#1C222D",
        "green-main": "#0D8E68",
        "green-bright": "#2FD4A1",
        "green-dark": "#0B7454",
        "green-darker": "#23373C",
        "primary-dark": "#0f172a",
        "pink-dark": "#AD72E9",
        "red-main": "#F53B3B",
        "secondary-dark": "#172554",
        "variant-color-0": "#4688D4",
        "variant-color-1": "#AD72E9",
        "variant-color-2": "#797EFA",
        "violet-main": "#7F9BFF",
        "white-3": "rgba(255, 255, 255, 0.03)",
        "white-6": "rgba(255, 255, 255, 0.06)",
        "white-10": "rgba(255, 255, 255, 0.10)",
        "white-20": "rgba(255, 255, 255, 0.20)",
        "yellow-main": "#FFDA91",
        "white-40": "rgba(255, 255, 255, 0.40)",
      },
      dropShadow: {
        glow: "0px 4px 20px rgba(70, 136, 212, 0.29)",
      },
      keyframes: {
        slideIn: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        slideIn: "slideIn 0.2s ease-out forwards",
      },
      fontFamily: {
        header: ["var(--main-font)"],
        body: ["var(--body-font)"],
        special: ["var(--special-font)"],
      },
      screens: {
        xs: { max: "580px" },
        sm: { max: "640px" },
        md: { max: "768px" },
        lg: { min: "768px", max: "1024px" },
        xl: { min: "1024px", max: "1280px" },
        smallScreen: { min: "580px", max: "1024px" },
        noMinLg: { max: "1024px" },
        noMin: { max: "1280px" },
        "2xl": { min: "1024px", max: "1380px" },
        "3xl": { min: "1380px", max: "1536px" },
        "4xl": { min: "1536px", max: "1920px" },
        // Adding big screen breakpoints with min and max
        "5xl": { min: "1920px", max: "2560px" },
        "6xl": { min: "2560px", max: "3200px" },
        "7xl": { min: "3200px" }, // 3200px and larger
        // Global big screen breakpoint without min
        noMax: { min: "2800px" }, // for all screens larger than 1920px (global big screen)
      },
    },
  },
};
export default config;
