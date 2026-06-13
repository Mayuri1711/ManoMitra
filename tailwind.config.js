/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6EC',
        saffron: '#F4A823',
        'saffron-dark': '#E09015',
        'calm-green': '#4CAF7D',
        'calm-green-dark': '#3a9368',
        'soft-blue': '#5B9BD5',
        'muted-purple': '#9B7FD4',
        'warm-amber': '#E8955A',
        'rose-warm': '#E07070',
        'text-main': '#2D1B0E',
        'text-soft': '#6B5B4E',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        hind: ['"Hind"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(45,27,14,0.08)',
        'card-hover': '0 8px 40px rgba(45,27,14,0.14)',
        glow: '0 0 30px rgba(244,168,35,0.25)',
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
