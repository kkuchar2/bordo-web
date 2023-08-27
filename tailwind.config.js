module.exports = {
    mode: 'jit',
    content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        extend: {
            keyframes: {
                navbarMenu: {
                    from: {
                        transform: 'translateY(-10px)',
                        opacity: 0,
                    },
                    to: {
                        transform: 'translateY(0)',
                        opacity: 1,
                    }
                },
                dialog: {
                    from: {
                        transform: 'translateY(-100px)',
                    },
                    to: {
                        transform: 'translateY(0)',
                    }
                }
            },
            animation: {
                dialog: 'dialog 0.6s cubic-bezier(0.1, 0.5, 0.12, 1) forwards',
                navbarMenu: 'navbarMenu 0.3s ease forwards',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
