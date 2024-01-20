import { HttpMethods, serverRequest } from '../../../baseAPI';
import { GAIA_SIGNIN_FAIL, GAIA_SIGNIN_REQUEST, GAIA_SIGNIN_SUCCESS, USER_SIGNOUT } from '../../constants/auth_service/userConstants';

const portName = {
    auth: 'authenticationServicePort',
    gaia: 'gaiaConnectorPort',
    middleware: 'middlewarePort',
}

// GAIA signin autimatically
// Call to middleware to Gaia
export const gaiaSignin = () => async (dispatch) => {
    dispatch({ type: GAIA_SIGNIN_REQUEST});
    try {
        const response = await serverRequest('/gaia/gaia-connect', HttpMethods.GET, portName.middleware, null);
        const data = JSON.stringify(response.data);
        dispatch({ type: GAIA_SIGNIN_SUCCESS, payload: JSON.parse(data)['accessToken'] });
        localStorage.setItem('gaiaInfo', JSON.stringify(data))
        localStorage.setItem('gaiaRefreshToken', JSON.parse(data)['refreshToken']);
        localStorage.setItem('gaiaAccessToken', JSON.parse(data)['accessToken']);
    } catch (error) {
        dispatch({
            type: GAIA_SIGNIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


// Automatically authenticate function
export const authenticate = async () => {
    const response = await serverRequest('/gaia/gaia-connect', HttpMethods.GET, portName.middleware, null);
    const data = JSON.stringify(response.data);
    const accessToken = JSON.parse(data)['accessToken'];
    const refreshToken = JSON.parse(data)['refreshToken'];

    localStorage.setItem('gaiaRefreshToken', refreshToken);
    localStorage.setItem('gaiaAccessToken', accessToken);

    if (data !== null && data !== undefined && data !== '') {
        // temporary
        localStorage.setItem('userId', 1);
        localStorage.setItem('gaiaStateActivated', true)
        console.log('GAIA is activated');
        return accessToken;
    } else {
        localStorage.setItem('gaiaStateActivated', false)
        console.log('GAIA is not activated');
    }
};

// export const signinFromBot = () => async (dispatch) => {
//     dispatch({ type: BOT_SIGNIN_REQUEST });
//     try {
//         const { data } = await serverRequest('/client/gaia-connect', HttpMethods.GET, portName.gaia, null);
//         dispatch({ type: BOT_SIGNIN_SUCCESS, payload: data });
//         localStorage.setItem('userInfo', JSON.stringify(data.data));
//     } catch (error) {
//         dispatch({
//             type: BOT_SIGNIN_FAIL,
//             payload: error.response && error.response.data.message
//                 ? error.response.data.message
//                 : error.message,
//         });
//     }
// };

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
    localStorage.removeItem('gaiaInfo');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('gaiaAccessToken');
    localStorage.removeItem('bossInfo'); 
    dispatch({ type: USER_SIGNOUT });
};