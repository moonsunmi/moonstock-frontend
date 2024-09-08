/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/browser/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fcf4f5',
          100: '#fae9ec',
          200: '#f4d7dc',
          300: '#ebb6c1',
          400: '#df8da0',
          500: '#d36e88',
          600: '#ba4468',
          700: '#9c3457',
          800: '#832e4d',
          900: '#712a46',
          950: '#3e1323'
        },
        gray: {
          25: '#fcfcfd',
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#e4e7ec',
          300: '#d0d5dd',
          400: '#98a2b3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1d2939',
          900: '#101828'
        }
      }
    }
  },
  plugins: []
}
