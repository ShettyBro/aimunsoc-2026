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
          DEFAULT: '#0A1628',
          light: '#112240',
          mid: '#1A3A5C',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8C97A',
        },
        muted: '#8899AA',
        teal: '#1A6B6B',
        danger: '#E05252',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
