import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import reactionReducer from './reactionReducer';

const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
  };

const persistedReducer = persistReducer(persistConfig, reactionReducer);

const reducer = combineReducers({
    userReducer,
    notifReducer,
    authReducer,
    themeReducer,
    filterReducer,
    sortReducer,
    detailsCardReducer,
    ItemCategoryReducer,
    persistedReducer
});

export const Store = configureStore({reducer, middleware: [thunk]});

export const persistor = persistStore(Store)