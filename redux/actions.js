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

export const ENABLE_ALL = 'ENABLE_ALL';

export const ENABLE_SIGNAL = 'ENABLE_SIGNAL';
export const DISABLE_SIGNAL = 'DISABLE_SIGNAL';

export const ENABLE_ANNOUNCE = 'ENABLE_ANNOUNCE';
export const DISABLE_ANNOUNCE = 'DISABLE_ANNOUNCE';

export const ENABLE_TRAITE = 'ENABLE_TRAITE';
export const DISABLE_TRAITE = 'DISABLE_TRAITE';

export const ENABLE_EN_COURS = 'ENABLE_EN_COURS';
export const DISABLE_EN_COURS = 'DISABLE_EN_COURS';

export const SET_SORT_VISIBLE = 'SET_SORT_VISIBLE';
export const SET_SORT_INVISIBLE = 'SET_SORT_INVISIBLE';

export const SET_DETAIL_CARD_VISIBLE = 'SET_DETAIL_CARD_VISIBLE';
export const SET_DETAIL_CARD__INVISIBLE = 'SET_DETAIL_CARD__INVISIBLE';

export const CHECK_RADIO_BUTTON = 'CHECK_RADIO_BUTTON';

export const SET_ITEM_CATEGORY = 'SET_ITEM_CATEGORY';

export const SET_UPVOTED = "SET_UPVOTED";
export const SET_DOWNVOTED = "SET_DOWNVOTED";
export const SET_SAVED = "SET_SAVED";


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

export const enableAll = () => dispatch => {
    dispatch({
        type: ENABLE_ALL
    });
};

export const enableSignals = () => dispatch => {
    dispatch({
        type: ENABLE_SIGNAL
    });
};

export const disableSignals = () => dispatch => {
    dispatch({
        type: DISABLE_SIGNAL
    });
};

export const enableAnnounce = () => dispatch => {
    dispatch({
        type: ENABLE_ANNOUNCE
    });
};

export const disableAnnounce = () => dispatch => {
    dispatch({
        type: DISABLE_ANNOUNCE
    });
};

export const enableTraite = () => dispatch => {
    dispatch({
        type: ENABLE_TRAITE
    });
};

export const disableTraite = () => dispatch => {
    dispatch({
        type: DISABLE_TRAITE
    });
};

export const enableEnCours = () => dispatch => {
    dispatch({
        type: ENABLE_EN_COURS
    });
};

export const disableEnCours = () => dispatch => {
    dispatch({
        type: DISABLE_EN_COURS
    });
};


export const setSortVisible = () => dispatch => {
    dispatch({
        type: SET_SORT_VISIBLE
    });
}

export const setSortInvisible = () => dispatch => {
    dispatch({
        type: SET_SORT_INVISIBLE
    });
}

export const check = (number) => dispatch => {
    dispatch({
        type: CHECK_RADIO_BUTTON,
        payload: number
    });
}


export const setDetailCardVisible = ({item}) => dispatch => {
    dispatch({
        type: SET_DETAIL_CARD_VISIBLE,
        payload: item
    });
}

export const setDetailCardInvisible = () => dispatch => {
    dispatch({
        type: SET_DETAIL_CARD__INVISIBLE,
        
    });
}

export const setItemCategory = ( category ) => dispatch => {
    dispatch({
        type: SET_ITEM_CATEGORY,
        payload: category
    });
}

export const setUpVoted = (id) => dispatch => {
    dispatch({
        type: SET_UPVOTED,
        payload: id
    })
}

export const setDownVoted = (id) => dispatch => {
    dispatch({
        type: SET_DOWNVOTED,
        payload: id
    })
}

export const setSaved = (id) => dispatch => {
    dispatch({
        type: SET_SAVED,
        payload: id
    })
}