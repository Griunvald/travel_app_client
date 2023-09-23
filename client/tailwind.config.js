/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          fontFamily: {
              'pacifico': ['Pacifico', 'cursive']
          },
          spacing: {
              '4.5':'1.125rem'
          }
      },
  },
  plugins: [],
}

