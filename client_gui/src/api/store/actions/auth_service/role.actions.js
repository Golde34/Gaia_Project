import { HttpMethods, serverRequest } from "../../../baseAPI";
import { ROLE_LIST_FAIL, ROLE_LIST_REQUEST, ROLE_LIST_SUCCESS } from "../../constants/auth_service/role.constants"

const portName = {
    authPort: 'authenticationServicePort',
}

export const getRoles = () => async (dispatch) => {
    dispatch({ type: ROLE_LIST_REQUEST });
    try {
        const { data } = await serverRequest('/role/get-all-roles', HttpMethods.GET, portName.authPort, null);
        dispatch({ type: ROLE_LIST_SUCCESS, payload: data.data.message });
    } catch (error) {
        dispatch({
            type: ROLE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}