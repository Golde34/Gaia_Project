import { ROLE_CREATE_FAIL, ROLE_CREATE_REQUEST, ROLE_CREATE_SUCCESS, ROLE_LIST_FAIL, ROLE_LIST_REQUEST, ROLE_LIST_SUCCESS } 
from "../../constants/auth_service/role.constants";

export const roleListReducer = (
    state = { loading: true, roles: [] }, action) => {
    switch (action.type) {
        case ROLE_LIST_REQUEST:
            return { loading: true };
        case ROLE_LIST_SUCCESS:
            return { loading: false, roles: action.payload };
        case ROLE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const roleCreateReducer = (
    state = { loading: true, role: {} }, action) => {
    switch (action.type) {
        case ROLE_CREATE_REQUEST:
            return { loading: true };
        case ROLE_CREATE_SUCCESS:
            return { loading: false, role: action.payload };
        case ROLE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}