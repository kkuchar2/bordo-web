module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        enter: 'enter 200ms ease-out',
        'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
        leave: 'leave 150ms ease-in forwards',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      colors: {
        'form-button': {
          default: '#33710f',
          hover: '#387b11',
        },
        toast: {
          '50': '#FFF6DF',
          '100': '#fdf7f1',
          '200': '#FFE092',
          '300': '#ebbf99',
          '400': '#dea373',
          '500': '#ce864f',
          '600': '#A1724E',
          '700': '#8c501c',
          '800': '#5c340f',
          '900': '#3f3f3f',
        }
      },
    }
  },
  daisyui: {
    base: false
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require("daisyui")
  ],
};