import {
    SET_ITEM_CATEGORY
  } from "./actions";
  
  const initialState = {
    category: {}
  };
  
  const ItemCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ITEM_CATEGORY:
        return { ...state,  category: action.payload };
      default:
        return state;
    }
  };
  
  export default ItemCategoryReducer;
  