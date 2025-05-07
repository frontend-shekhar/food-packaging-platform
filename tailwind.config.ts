import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: "200px 0 200px 0",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      screens: {
        "3xl": "1680px",
      },
      colors: {
        greyE7: "#3F322F",
        grey88: "#6A7788",
        blueCE: "#0D6ACE",
        blue83: "#003f83",
        blueDark4F: "#122D4F",
        blueDark6c: "#344d6c",
        blueDark4FHover: "#16457F",
        blueCEHover: "#4592E4",
        orangeFF: "#FF4D01",
        orangeFFHover: "#DF5E27",
        content45: "#2A3645",
        red04: "#EE0004",
        "custom-blue": "#122D4F",
        "custom-white": "#FFF",
      },
      fontFamily: {
        chopinTrial: ["chopin-trial"],
        tektur: ["Tektur", "serif"],
      },
      boxShadow: {
        inputShadow: "0 1px 11px 2px rgba(140, 136, 180, 0.09)",
        custom:
          "0 4px 4px 0 rgba(8, 8, 8, 0.08), 0 1px 2px 0 rgba(8, 8, 8, 0.20), inset 0 6px 12px 0 rgba(255, 255, 255, 0.12), inset 0 1px 1px 0 rgba(255, 255, 255, 0.20)",
      },
         keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "auth-bg": "url('/images/auth-bg.jpg')",
        "login-bg": "url('/images/login.png')",
        "register-bg": "url('/images/register.png')",
        "otp-bg": "url('/images/otp.png')",
        "forgot-bg": "url('/images/forgot.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
