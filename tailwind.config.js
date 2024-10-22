/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#016FEE",
        background: "#181a1b"
      },
      padding: {
        xs: "1vw",
        sm: "2vw",
        md: "3vw",
        lg: "4vw",
        xl: "6vw",
        "2xl": "8vw",
        "3xl": "10vw",
        "4xl": "12vw",
        "5xl": "14vw",
        "6xl": "16vw",
        "8xl": "18vw",
        "9xl": "20vw",
        "10xl": "22vw",
        "11xl": "24vw",
        "12xl": "26vw",
      },
    },
  },
  plugins: [],
};
