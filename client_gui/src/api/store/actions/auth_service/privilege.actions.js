import { HttpMethods, serverRequest } from "../../../baseAPI";
import { PRIVILEGE_LIST_FAIL, PRIVILEGE_LIST_REQUEST, PRIVILEGE_LIST_SUCCESS } 
from "../../constants/auth_service/privilege.constants";

const portName = {
    middlewarePort: "middlewarePort"
}

export const getPrivileges = () => async (dispatch) => {
    dispatch({ type: PRIVILEGE_LIST_REQUEST });
    try {
        const { data } = await serverRequest('/privilege/get-all-privileges', HttpMethods.GET, portName.middlewarePort, null); 
        dispatch({ type: PRIVILEGE_LIST_SUCCESS, payload: data.data.getAllPrivileges });
    } catch (error) {
        dispatch({
            type: PRIVILEGE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}