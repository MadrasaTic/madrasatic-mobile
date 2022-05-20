import {
    SET_DETAIL_CARD_VISIBLE,
    SET_DETAIL_CARD__INVISIBLE
  } from "./actions";
  
  const initialState = {
    visible: false,
    item: {},
  };
  
  const detailsCardReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_DETAIL_CARD_VISIBLE:
        return { ...state, visible: true, item: action.payload };
      case SET_DETAIL_CARD__INVISIBLE:
        return { ...state, visible: false };
      default:
        return state;
    }
  };
  
  export default detailsCardReducer;
  