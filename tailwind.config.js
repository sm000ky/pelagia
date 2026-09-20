/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE1',
          300: '#EBDDCB',
          400: '#DEC6AE',
          500: '#CFAC8F',
          dark: '#131920',
        },
        risograph: {
          terracotta: '#D95A47',
          mustard: '#EAA838',
          teal: '#2F6D68',
          sage: '#6D9886',
          indigo: '#1F3144',
          midnight: '#111A24',
          abyss: '#0A1017',
          hadal: '#05080C',
          coral: '#E06D53',
          chalk: '#F2EFEB',
          ink: '#1E252B',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['Courier Prime', 'JetBrains Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'paper-sm': '2px 2px 0px rgba(0,0,0,0.15)',
        'paper': '3px 4px 0px rgba(0,0,0,0.18)',
        'paper-lg': '5px 7px 0px rgba(0,0,0,0.22)',
        'paper-hover': '6px 9px 0px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
}
