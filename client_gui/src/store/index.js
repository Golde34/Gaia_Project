import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { initialState } from './reducers/initial_state';
import { reducer } from './reducers/reducers';

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;