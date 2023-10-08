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
              'sans': ['Roboto', 'sans-serif']
          },
          textColor: {
            'gray-900': '#333333',
            'gray-800': '#4F4F4F',
            'gray-700': '#828282',
            'gray-600': '#BDBDBD',
            'gray-500': '#E0E0E0',
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

