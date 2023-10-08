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
           borderColor: {
            'primary': '#333333', 
            'secondary': '#828282',
            'tertiary': '#BDBDBD',
      },
          backgroundColor: {
            'primary': '#ffffff',
            'secondary': '#f2f2f2',
            'accent': '#333333',
      },
          boxShadow: {
            'soft': '0 4px 6px rgba(0, 0, 0, 0.1)',
            'medium': '0 6px 15px rgba(0, 0, 0, 0.1)',
            'strong': '0 8px 24px rgba(0, 0, 0, 0.2)',
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

