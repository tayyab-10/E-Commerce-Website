/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        sans: ['"Lucida Sans"', 'Geneva', 'Verdana', 'sans-serif'],
      },
      clipPath: {
        banner: 'polygon(100% 68%, 0 100%, 100% 100%)',
      },
    },
  },
  plugins: [],
}