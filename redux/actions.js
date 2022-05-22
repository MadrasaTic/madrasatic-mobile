export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_PICTURE = 'SET_USER_PICTURE';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_LOGGED_OUT = 'SET_LOGGED_OUT';
export const ENABLE_NOTIF_ANNONCE = 'ENABLE_NOTIF_ANNONCE';
export const DISABLE_NOTIF_ANNONCE = 'DISABLE_NOTIF_ANNONCE';
export const ENABLE_NOTIF_SIGNALS = 'ENABLE_NOTIF_SIGNALS';
export const DISABLE_NOTIF_SIGNALS = 'DISABLE_NOTIF_SIGNALS';
export const SET_DARK_THEME = 'SET_DARK_THEME';
export const SET_LIGHT_THEME = 'SET_LIGHT_THEME';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setUserName = name => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: name
    });
};

export const setUserEmail = email => dispatch => {
    dispatch({
        type: SET_USER_EMAIL,
        payload: email
    });
};

export const setUserPicture = picture => dispatch => {
    dispatch({
        type: SET_USER_PICTURE,
        payload: picture
    });
};

export const setLoggedIn = () => dispatch => {
    dispatch({
        type: SET_LOGGED_IN,
    });
};

export const setLoggedOut = () => dispatch => {
    dispatch({
        type: SET_LOGGED_OUT,
    });
};

export const enableNotifAnnonce = () => dispatch => {
    dispatch({
        type: ENABLE_NOTIF_ANNONCE
    });
};

export const disableNotifAnnonce = () => dispatch => {
    dispatch({
        type: DISABLE_NOTIF_ANNONCE
    });
};

export const enableNotifSignal = () => dispatch => {
    dispatch({
        type: ENABLE_NOTIF_SIGNALS
    });
};

export const disableNotifSignal = () => dispatch => {
    dispatch({
        type: DISABLE_NOTIF_SIGNALS
    });
};

export const setDarkTheme = () => dispatch => {
    dispatch({
        type: SET_DARK_THEME
    })
};

export const setLightTheme = () => dispatch => {
    dispatch({
        type: SET_LIGHT_THEME
    })
};

export const setCategories = () => dispatch => {
    dispatch({
        type: SET_CATEGORIES
    });
};