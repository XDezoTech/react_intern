/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8eaf2',
          100: '#c5c9e0',
          200: '#9ea5cb',
          300: '#7781b5',
          400: '#5a65a5',
          500: '#3d4994',
          600: '#374286',
          700: '#2f3874',
          800: '#272e62',
          900: '#1a1f44',
          950: '#0d1028',
        },
        terracotta: {
          50: '#fdf0ec',
          100: '#fad9d0',
          200: '#f5b4a4',
          300: '#ee8b73',
          400: '#e66a4d',
          500: '#d4533a',
          600: '#bc4530',
          700: '#9a3827',
          800: '#7d2e20',
          900: '#66261a',
        },
        sand: {
          50: '#fdfaf5',
          100: '#f8f2e4',
          200: '#f0e3c8',
          300: '#e6d0a5',
          400: '#d9b97c',
          500: '#c9a059',
          600: '#b08540',
          700: '#926b32',
          800: '#78562b',
          900: '#624726',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Outfit', 'Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
