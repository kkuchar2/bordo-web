module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'enter-menu': 'from-right 1.2s cubic-bezier(.41,.73,.51,1.02)',
                'exit-menu': 'from-left 1.2s cubic-bezier(.41,.73,.51,1.02)',
                enter: 'enter 200ms ease-out',
                'slide-in': 'slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)',
                leave: 'leave 150ms ease-in forwards',
            },
            keyframes: {
                enter: {
                    '0%': {transform: 'scale(0.9)', opacity: 0},
                    '100%': {transform: 'scale(1)', opacity: 1},
                },
                leave: {
                    '0%': {transform: 'scale(1)', opacity: 1},
                    '100%': {transform: 'scale(0.9)', opacity: 0},
                },
                'slide-in': {
                    '0%': {transform: 'translateY(-100%)'},
                    '100%': {transform: 'translateY(0)'},
                },
                'from-right': {
                    '0%': {transform: 'translateX(100%)'},
                    '100%': {transform: 'translateX(0)'},
                },
                'from-left': {
                    '0%': {transform: 'translateX(0)'},
                    '100%': {transform: 'translateX(100%)'},
                },
            },
            colors: {
                home: {
                    bg: {
                        dark: '#363636',
                        light: '#fafafa',
                    },
                    title: {
                        dark: '#fafafa',
                        light: '#535353',
                    }
                },
                navbar: {
                    bg: {
                        'lg-light': '#e3e3e3',
                        'lg-dark': '#2e2e2e',
                    },
                    'group-title': {
                        dark: '#a7a7a7',
                        light: '#1a1a1a',
                    },
                    item: {
                        'color-light': '#747474',
                        'color-dark': '#cecece',
                        'hover-light': '#fafafa',
                        'hover-dark': '#2e2e2e',
                    }
                },
                'form-button': {
                    default: '#0B5830',
                    hover: '#0c6a39',
                },
                'input': {
                    title: '#C1C1C1',
                    default: '#1F1F1F',
                    disabled: 'rgba(31,31,31,0.47)',
                },
                'ua-link': {
                    default: '#74D79F',
                    hover: '#00f7ff',
                    visited: '#74D79F',
                },
                settings: {
                    section: {
                        light: '#fafafa',
                        dark: '#2e2e2e',
                    }
                },
                btn: {
                    edit: {
                        full: {
                            'default-dark': '#2e2e2e',
                            'default-light': '#fafafa',
                            'hover-light': '#2e2e2e',
                            'hover-dark': '#454545',
                        }
                    }
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
        },
        fontFamily: {
            sarabun: ['Sarabun', 'sans-serif'],
        }
    },
    daisyui: {
        base: false
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require("daisyui"),
        require('@tailwindcss/typography'),
    ],
};