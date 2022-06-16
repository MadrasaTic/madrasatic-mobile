import { SET_DARK_THEME, SET_LIGHT_THEME } from "./actions";

const initialState = {
    theme: {
        PRIMARY: '#203659',
        DARK: '#0E0E2C',
        ERROR: '#F80509',
        SUCCESS: '#35F9AE',
        TEXT: '#4A4A68',
        SUBTLE: '#8C8CA1',
        ACCENT: '#ECF1F4',
        CLOUD: '#FAFCFE',
        IRIS_10: '#EFEFFD',
        LIGHT: '#FAFCFE'
     },
    isLight: true,
    statusbarStyle: 'dark-content'
};

const defaultColors = {
    PRIMARY: '#203659',
    DARK: '#0E0E2C',
    ERROR: '#F80509',
    SUCCESS: '#35F9AE',
    TEXT: '#4A4A68',
    SUBTLE: '#8C8CA1',
    ACCENT: '#ECF1F4',
    CLOUD: '#FAFCFE',
    IRIS_10: '#EFEFFD',
    LIGHT: '#FAFCFE'
 };

 const darkColors = {
    PRIMARY: '#ECF1F4',
    DARK: '#FAFCFE',
    ERROR: '#F80509',
    SUCCESS: '#35F9AE',
    TEXT: '#FFFFFF',
    SUBTLE: '#EFEFFD',
    ACCENT: '#203659',
    CLOUD: '#203659',
    IRIS_10: '#8C8CA1',
    LIGHT: '#0E0E2C'
 };


const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DARK_THEME:
            return{...state, theme: darkColors, isLight: false, statusbarStyle: 'light-content'};
        case SET_LIGHT_THEME:
            return{...state, theme: defaultColors, isLight: true, statusbarStyle: 'dark-content'};
        default:
            return state;
    }
}

export default themeReducer;