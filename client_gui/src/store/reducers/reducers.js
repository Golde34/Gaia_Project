import { combineReducers } from "redux";

import {
    userSigninReducer,
    gaiaSigninReducer,
} from './auth_service/userReducers'

import {
    projectListReducer
} from './task_manager/projectReducers'

export const reducer = combineReducers({
    // auth service
    userSignin: userSigninReducer,
    gaiaSignin: gaiaSigninReducer,
    // task manager
    projectList: projectListReducer,

})