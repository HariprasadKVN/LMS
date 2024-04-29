import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      filter: {
        invert: "invert(1)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".filter-invert": {
          filter: "invert(1)",
        },
      };

      addUtilities(newUtilities, ["dark"]);
    },
  ],
};
export default config;
