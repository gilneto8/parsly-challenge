import deepMerge from 'deepmerge';
import {
    createTheme,
    responsiveFontSizes,
    ThemeOptions,
    Theme,
} from '@material-ui/core/styles';

const makeTheme = (variant: ThemeOptions): Theme => {
    const common = {
        typography: {
            fontFamily: 'Lato',
        },
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '*::-webkit-scrollbar': {
                        width: '0.5rem',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        background: '#888',
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                    },
                },
            },
        },
    };
    const theme = createTheme(deepMerge(common, variant));
    return responsiveFontSizes(theme);
};

const light: ThemeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#006cff',
        },
        secondary: {
            main: '#898989',
        },
        error: {
            main: '#ff003c',
        },
        warning: {
            main: '#ffc000',
        },
        info: {
            main: '#007bff',
        },
        success: {
            main: '#63ad0e',
        },
        text: {
            primary: '#343a40',
            secondary: '#2e3133',
            hint: '#363c42',
            disabled: '#48494a',
        },
        background: {
            default: '#ced1dc',
            paper: '#b2b6c1',
        },
    },
};

const dark: ThemeOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#006cff',
        },
        secondary: {
            main: '#898989',
        },
        error: {
            main: '#ff003c',
        },
        warning: {
            main: '#ffc000',
        },
        info: {
            main: '#007bff',
        },
        success: {
            main: '#63ad0e',
        },
        text: {
            primary: '#f8f9fa',
            secondary: '#e4e7eb',
            hint: '#bbbcbd',
            disabled: '#ccc',
        },
        background: {
            default: '#17242a',
            paper: '#162024',
        },
    },
};

const themes: { [key: string]: Theme } = {
    light: makeTheme(light),
    dark: makeTheme(dark),
};

export const themeCookie = 'clthmvar';

export default themes;
