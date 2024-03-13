import { PRIVILEGE_LIST_FAIL, PRIVILEGE_LIST_REQUEST, PRIVILEGE_LIST_SUCCESS } 
from "../../constants/auth_service/privilege.constants";

export const privilegeListReducer = (
    state = { loading: true, privileges: [] }, action) => {
    switch (action.type) {
        case PRIVILEGE_LIST_REQUEST:
            return { loading: true };
        case PRIVILEGE_LIST_SUCCESS:
            return { loading: false, privileges: action.payload };
        case PRIVILEGE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}