import { SET_DARK_THEME, SET_LIGHT_THEME } from "./actions";

const initialState = {
    darkTheme: false
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DARK_THEME:
            return{...state, darkTheme: true};
        case SET_LIGHT_THEME:
            return{...state, darkTheme: false};
        default:
            return state;
    }
}

export default themeReducer;