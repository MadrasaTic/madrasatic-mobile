import {
  SET_SORT_VISIBLE,
  SET_SORT_INVISIBLE,
  CHECK_RADIO_BUTTON,
} from "./actions";

const initialState = {
  visible: false,
  checked: "dateDSC",
};

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_VISIBLE:
      return { ...state, visible: true };
    case SET_SORT_INVISIBLE:
      return { ...state, visible: false };
    case CHECK_RADIO_BUTTON:
      return { ...state, checked: action.payload };
    default:
      return state;
  }
};

export default sortReducer;
