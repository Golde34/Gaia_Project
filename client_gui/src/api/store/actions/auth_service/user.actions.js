import { USER_LIST_REQUEST } from "../../constants/auth_service/user.constants";

const portName = {
    authPort: 'authenticationServicePort',
}

export const getUsers = () => async (dispatch) => {
    dispatch({ type: USER_LIST_REQUEST });
    try {
        const { data } = await serverRequest('/user/getAllUsers', HttpMethods.GET, portName.authPort, null);
        dispatch({ type: USER_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}