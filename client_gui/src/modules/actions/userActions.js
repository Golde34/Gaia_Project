import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL
} from '../constants/userConstants';
// import Axios from 'axios';


export const signinFromBot = (accessToken, refreshToken) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { accessToken, refreshToken } });
    try {
        const {data}
    }
}