import { HttpMethods, serverRequest } from "../../../baseAPI";
import { ROLE_LIST_FAIL, ROLE_LIST_REQUEST, ROLE_LIST_SUCCESS,
    ROLE_CREATE_FAIL, ROLE_CREATE_REQUEST, ROLE_CREATE_SUCCESS
 } from "../../constants/auth_service/role.constants"

const portName = {
    middlewarePort: "middlewarePort"
}

export const getRoles = () => async (dispatch) => {
    dispatch({ type: ROLE_LIST_REQUEST });
    try {
        const { data } = await serverRequest('/role/get-all-roles', HttpMethods.GET, portName.middlewarePort, null);
        dispatch({ type: ROLE_LIST_SUCCESS, payload: data.data.getAllRoles });
    } catch (error) {
        dispatch({
            type: ROLE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const createRole = (role) => async (dispatch) => {
    dispatch({ type: ROLE_CREATE_REQUEST});
    try {
        const { data } = await serverRequest('/role/create-role', HttpMethods.POST, portName.middlewarePort, role);
        dispatch({ type: ROLE_CREATE_SUCCESS, payload: data.data.createRole });
    } catch (error) {
        dispatch({
            type: ROLE_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}