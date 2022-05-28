import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import notifReducer from './notifReducer';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import categoriesReducer from './categoriesReducer';
import filterReducer from './filterReducer';
import sortReducer from './sortReducer';
import detailsCardReducer from './detailsCardReducer';
import ItemCategoryReducer from './ItemCategoryReducer';
import itemReducer from './itemReducer';



const reducer = combineReducers({
    userReducer,
    notifReducer,
    authReducer,
    themeReducer,
    filterReducer,
    sortReducer,
    detailsCardReducer,
    ItemCategoryReducer,
    itemReducer,
});

export const Store = configureStore({reducer, middleware: [thunk]});
