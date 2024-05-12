/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "rgb(18, 18, 18)",
        "bg-container-color": "rgb(42,42,42)",
        "primary-content-color": "rgb(41,178,90)",
        "secondary-text-color": "rgb(167,167,167)",
      },
    },
  },
  plugins: [],
};
