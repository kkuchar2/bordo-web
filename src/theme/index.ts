import {extendTheme} from '@chakra-ui/react';

// Define tokens
const tokens = {
    colors: {
        'default': {
            'bg-default': '#ffffff',
            'text-default': '#333',
            'rainbow': 'linear-gradient(135deg, #0e73cc 1.93%, #624bbb 14.86%, #ff455d 48.09%, #f35815 77.82%, #f2b600 97.3%)',
        },
        _dark: {
            'bg-default': '#333333',
            'text-default': '#dfdfdf',
            'rainbow': 'linear-gradient(135deg, #0e73cc 1.93%, #624bbb 14.86%, #ff455d 48.09%, #f35815 77.82%, #f2b600 97.3%)',
        },
    },
    shadows: {
        'default': {
            xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
            inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
            none: 'none',
            'project-item-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        _dark: {
            xs: '0 0 0 1px rgba(255, 255, 255, 0.05)',
            sm: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
            base: '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
            md: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
            lg: '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
            xl: '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)',
            '2xl': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
            outline: '0 0 0 3px rgba(66, 153, 225, 0.6)',
            inner: 'inset 0 2px 4px 0 rgba(255,255,255,0.06)',
            none: 'none',
            'project-item-shadow': 'none',
        }
    }
};

// Define semantic tokens
const semanticTokens = { colors: {}, shadows: {} };
const colorProps = Object.keys(tokens.colors['default']);
const shadowProps = Object.keys(tokens.shadows['default']);

colorProps.forEach(prop => {
    semanticTokens['colors'][prop] = {
        'default': tokens.colors['default'][prop],
        '_dark': tokens.colors['_dark'][prop]
    };
});

shadowProps.forEach(prop => {
    semanticTokens['shadows'][prop] = {
        'default': tokens.shadows['default'][prop],
        '_dark': tokens.shadows['_dark'][prop]
    };
});

// define breakpoints
const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
};

// define global styles
const styles = {
    global: {
        body: {
            bg: 'none',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            zIndex: 0,
            color: 'text-default',
        }
    }
};

// define config
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false
};

// define fonts
const fonts = {
    body: '\'Inter\', sans-serif',
};

// define font weights
const fontWeights = {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
};

const theme = extendTheme({
    config,
    styles,
    tokens,
    semanticTokens,
    breakpoints,
    fonts,
    fontWeights
});

export default theme;