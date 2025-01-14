import {
    GET_USER_GITHUB_INFO_FAILURE, GET_USER_GITHUB_INFO_REQUEST, GET_USER_GITHUB_INFO_SUCCESS
} from "../../constants/contribution_tracker/user-commit.constants";

export const getUserGithubInfoReducer = (
    state = { loading: true, users: [] }, action) => {
    switch (action.type) {
        case GET_USER_GITHUB_INFO_REQUEST:
            return { loading: true };
        case GET_USER_GITHUB_INFO_SUCCESS:
            return { loading: false, userGithubInfo: action.payload }
        case GET_USER_GITHUB_INFO_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}