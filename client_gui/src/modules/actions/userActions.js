import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, BOT_SIGNIN_REQUEST, BOT_SIGNIN_SUCCESS, BOT_SIGNIN_FAIL
} from '../constants/userConstants';
import Axios from 'axios';
import { config } from "../../configs/configuration"

const authenticationServicePort = config.authenticationServicePort;
const gaiaConnectorPort = config.gaiaConnectorPort;

export const signinFromBot = (accessToken, refreshToken) => async (dispatch) => {
    dispatch({ type: BOT_SIGNIN_REQUEST, payload: { accessToken, refreshToken } });
    try {
        const { data } = await Axios.post(`http://${config.serverHost}:${gaiaConnectorPort}/client/gaia-connect`);
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
        const { data } = await Axios.post(`http://${config.serverHost}:${authenticationServicePort}/auth/sign-in`, {username, password });
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