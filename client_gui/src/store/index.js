import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const initialState = {
}

const reducer = {}

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;