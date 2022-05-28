import { SET_ITEM } from "./actions";

const initialState = {
  item: {}
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM:
      return { ...state, item: action.payload };
    default:
      return state;
  }
};

export default itemReducer;
