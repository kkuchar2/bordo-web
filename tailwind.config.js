module.exports = {
    mode: 'jit',
    content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
        extend: {
            keyframes: {
                fieldError: {
                    from: {
                        transform: 'translateY(-20px)',
                    },
                    to: {
                        transform: 'translateY(0)',
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
                fieldError: 'fieldError 0.3s ease forwards',
                dialog: 'dialog 0.6s cubic-bezier(0.1, 0.5, 0.12, 1) forwards',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
