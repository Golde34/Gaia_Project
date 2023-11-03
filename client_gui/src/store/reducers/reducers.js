import { combineReducers } from "redux";

import {
    userSigninReducer,
    gaiaSigninReducer,
} from './auth_service/userReducers'

export const reducer = combineReducers({
    userSignin: userSigninReducer,
    gaiaSignin: gaiaSigninReducer,
})