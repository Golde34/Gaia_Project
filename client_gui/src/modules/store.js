import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { gaiaSigninReducer, userSigninReducer } from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    botSignin: {
        botInfo: localStorage.getItem('botInfo')
            ? JSON.parse(localStorage.getItem('botInfo'))
            : null,
    },
};

const reducer = {
    botSignin: gaiaSigninReducer,
    userSignin: userSigninReducer,
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production', // Optional: disable devTools in production
});

export default store;