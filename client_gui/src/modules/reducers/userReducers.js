import { 
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    BOT_SIGNIN_REQUEST, BOT_SIGNIN_SUCCESS, BOT_SIGNIN_FAIL 
} from '../constants/userConstants';

export const gaiaSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case BOT_SIGNIN_REQUEST:
            return { loading: true };
        case BOT_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case BOT_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
}

export const userSigninReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };
        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
        default: 
            return state;
    }
}