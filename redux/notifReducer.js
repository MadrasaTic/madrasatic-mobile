import { ENABLE_NOTIF_ANNONCE, ENABLE_NOTIF_SIGNALS, DISABLE_NOTIF_ANNONCE, DISABLE_NOTIF_SIGNALS } from "./actions";

const initialState = {
    annonce: false,
    signal: false
};

const notifReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENABLE_NOTIF_ANNONCE:
            return { ...state, annonce: true };
        case DISABLE_NOTIF_ANNONCE:
            return { ...state, annonce: false };
        case ENABLE_NOTIF_SIGNALS:
            return { ...state, signal: true };
        case DISABLE_NOTIF_SIGNALS:
            return { ...state, signal: false };
        default:
            return state;
    }
}

export default notifReducer;