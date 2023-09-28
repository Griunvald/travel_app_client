/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          fontFamily: {
              'pacifico': ['Pacifico', 'cursive'],
              'montserrat': ['Montserrat', 'sans-serif'],
              'pt-serif': ['PT Serif', 'serif'],
              'playfair-display': ['Playfair Display', 'serif'],
              'roboto': ['Roboto', 'sans-serif']
          },
          spacing: {
              '4.5':'1.125rem'
          }
      },
  },
    plugins: [
        require('@tailwindcss/forms')
    ],
}

