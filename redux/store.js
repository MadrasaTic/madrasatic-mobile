import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import notifReducer from './notifReducer';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import categoriesReducer from './categoriesReducer';

const reducer = combineReducers({userReducer, notifReducer, authReducer, themeReducer, categoriesReducer});

export default Store = configureStore({reducer, middleware: [thunk]});