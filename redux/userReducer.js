import { SET_USER_EMAIL, SET_USER_NAME, SET_USER_PICTURE } from "./actions";

const initialState = {
    name: '',
    email: '',
    picture: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.payload };
        case SET_USER_EMAIL:
            return { ...state, email: action.payload };
        case SET_USER_PICTURE:
            return { ...state, picture: action.payload };
        default:
            return state;
    }
}

export default userReducer;