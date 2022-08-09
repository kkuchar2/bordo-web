module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
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
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/typography'),
    ],
};