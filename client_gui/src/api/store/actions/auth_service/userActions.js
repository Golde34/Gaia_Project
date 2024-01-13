import { HttpMethods, serverRequest } from '../../../baseAPI';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    BOT_SIGNIN_REQUEST, BOT_SIGNIN_SUCCESS, BOT_SIGNIN_FAIL,
} from '../../constants/auth_service/userConstants';

const portName = {
    auth: 'authenticationServicePort',
    gaia: 'gaiaConnectorPort',
    middleware: 'middlewarePort',
}

// Automatically authenticate function
export const authenticate = async () => {
    const response = await serverRequest('/gaia/gaia-connect', HttpMethods.GET, portName.middleware, null);
    const data = JSON.stringify(response.data);
    console.log(data)
    if (data !== null && data !== undefined && data !== '') {
        localStorage.setItem('gaiaToken', data);
        // temporary
        localStorage.setItem('userId', 1);
        localStorage.setItem('gaiaStateActivated', true)
        console.log('GAIA is activated');
        return data;
    } else {
        localStorage.setItem('gaiaStateActivated', false)
        console.log(localStorage.getItem('gaiaStateActivated'));
        console.log('GAIA is not activated');
    }
};

export const signinFromBot = () => async (dispatch) => {
    dispatch({ type: BOT_SIGNIN_REQUEST });
    try {
        const { data } = await serverRequest('/client/gaia-connect', HttpMethods.GET, portName.gaia, null);
        dispatch({ type: BOT_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data.data));
    } catch (error) {
        dispatch({
            type: BOT_SIGNIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const signin = (username, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
    try {
        const { data } = await serverRequest('/auth/sign-in', HttpMethods.POST, portName.auth, { username, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
};