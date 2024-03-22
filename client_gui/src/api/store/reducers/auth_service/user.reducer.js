import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, 
    USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS 
} from "../../constants/auth_service/user.constants";

export const userListReducer = (
    state = { loading: true, users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const userUpdateReducer = (
    state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true };
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true };
        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}