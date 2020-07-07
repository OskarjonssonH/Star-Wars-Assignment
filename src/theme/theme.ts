import { createMuiTheme } from '@material-ui/core';

// Custom MUI theme
export const theme = createMuiTheme({
    // Changed breakpoints value to fit the specifications
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1140,
            xl: 1920
        }
    },
    // Set default font to fit the specifications
    typography: {
        fontFamily: 'Arial'
    },
    // Set colors in theme for a more clean and consistent code
    palette: {
        primary: { main: '#2C4053' },
        secondary: { main: '#1B8DE7' }
    }
});
