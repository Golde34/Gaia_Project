import { HttpMethods, serverRequest } from "../../../baseAPI";
import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, 
    USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS 
} from "../../constants/auth_service/user.constants";

const portName = {
    authPort: 'authenticationServicePort',
}

export const getUsers = () => async (dispatch) => {
    dispatch({ type: USER_LIST_REQUEST });
    try {
        const { data } = await serverRequest('/user/get-all-users', HttpMethods.GET, portName.authPort, null);
        dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updateUser = (user) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
        const { data } = await serverRequest('/user/update-user', HttpMethods.PUT, portName.authPort, user);
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}