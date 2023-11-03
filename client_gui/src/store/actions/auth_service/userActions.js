import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    BOT_SIGNIN_REQUEST, BOT_SIGNIN_SUCCESS, BOT_SIGNIN_FAIL,
} from '../../constants/auth_service/userConstants';

const portName = {
    auth: 'authenticationServicePort',
    gaia: 'gaiaConnectorPort',
}

export const signinFromBot = (accessToken, refreshToken) => async (dispatch) => {
    dispatch({ type: BOT_SIGNIN_REQUEST, payload: { accessToken, refreshToken } });
    try {
        const { data } = await baseRequest('/client/gaia-connect', HttpMethods.POST, portName.gaia, { accessToken, refreshToken });
        dispatch({ type: BOT_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: BOT_SIGNIN_FAIL, 
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

export const signin = (username, password)=> async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
    try {
        const { data } = await baseRequest('/auth/sign-in', HttpMethods.POST, portName.auth, { username, password });
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