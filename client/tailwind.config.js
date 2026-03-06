/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          primary: '#0A0A0A',
          secondary: '#111111',
          card: '#1A1A1A',
          border: '#2A2A2A',
        },
        red: {
          primary: '#8B0000',
          accent: '#C0392B',
          hover: '#A93226',
        },
        gold: {
          primary: '#C9A84C',
          light: '#E2C97E',
        },
        white: {
          primary: '#F5F0E8',
          muted: '#B0A898',
          subtle: '#6B6560',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        jost: ['Jost', 'sans-serif'],
      },
      letterSpacing: {
        wide: '0.02em',
        wider: '0.05em',
      },
    },
  },
  plugins: [],
}
