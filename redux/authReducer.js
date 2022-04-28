import { SET_LOGGED_IN, SET_LOGGED_OUT } from "./actions";

const initialState = {
    loggedIn: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGGED_IN:
            return { ...state, loggedIn: true };
        case SET_LOGGED_OUT:
            return { ...state, loggedIn: false };
        default:
            return state;
    }
}

export default authReducer;