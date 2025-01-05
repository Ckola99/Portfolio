/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fira-code': ['Fira Code'],
      },
      colors: {
        'midnight': '#01080E',
        'navy-blue-primary': '#011627',
        'navy-blue': '#011221',
        'light-gray': '#607B96',
        'mint': '#3C9D93',
        'blue': '#4D5BCE',
        'white': '#FFFFFF',
        'orange-accent': '#FEA55F',
        'mint-accent': '#43D9AD',
        'peach-accent': '#E99287',
        'violet-accent': '#C98BDF',
        'line-color': '#1E2D3D',
        gray: {
          700: '#3b3b3b',
          800: '#2a2a2a',
        },
      },
      animation: {
        pulse: 'pulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
