/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        targaryen: ['Targaryen', 'serif'],
      },
      colors: {
        'dragon-red': '#8B0000',
        'dragon-gold': '#FFD700',
        'dragon-black': '#1A0F0F',
        'ember': '#FF4500',
        'ash': '#2C2C2C',
        'house-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
      animation: {
        'flame': 'flame 1.5s ease-in-out infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-fire': 'pulse-fire 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ember-float': 'ember-float 3s ease-out infinite',
        'dragon-fly': 'dragon-fly 20s ease-in-out infinite',
      },
      keyframes: {
        flame: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(1)' },
          '50%': { transform: 'rotate(3deg) scale(1.05)' },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-fire': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.8',
            transform: 'scale(1.1)',
          },
        },
        'ember-float': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
        },
        'dragon-fly': {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '25%': {
            transform: 'translate(50px, -30px) rotate(5deg)',
          },
          '50%': {
            transform: 'translate(0, -60px) rotate(0deg)',
          },
          '75%': {
            transform: 'translate(-50px, -30px) rotate(-5deg)',
          },
        },
      },
      backgroundImage: {
        'dragon-scales': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M30 0l30 30-30 30L0 30 30 0z\" fill=\"%23991B1B\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
        'green-scales': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M30 0l30 30-30 30L0 30 30 0z\" fill=\"%23166534\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
        'fire-gradient': 'linear-gradient(45deg, #FF4500, #8B0000)',
        'ancient-paper': 'linear-gradient(45deg, #D4C4A8, #E5DCC3)',
        'dragon-eye': 'radial-gradient(circle at center, #FF0000 0%, #8B0000 50%, #4B0000 100%)',
      },
      boxShadow: {
        'fire': '0 0 20px rgba(255, 69, 0, 0.6)',
        'ember': '0 0 15px rgba(255, 69, 0, 0.4)',
        'dragon': '0 0 30px rgba(139, 0, 0, 0.8)',
      },
      dropShadow: {
        'fire': '0 0 10px rgba(255, 69, 0, 0.5)',
        'ember': '0 0 8px rgba(255, 69, 0, 0.3)',
      },
    },
  },
  plugins: [],
};