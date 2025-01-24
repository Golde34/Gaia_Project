import { 
    GET_PROJECT_AND_REPO_FAILURE, GET_PROJECT_AND_REPO_REQUEST, GET_PROJECT_AND_REPO_SUCCESS 
} from "../../constants/contribution_tracker/user-project.constants";

export const getProjectAndRepoRequestReducer = (
    state = { loading: true }, action) => {
    switch (action.type) {
        case GET_PROJECT_AND_REPO_REQUEST:
            return { loading: true };
        case GET_PROJECT_AND_REPO_SUCCESS:
            return { loading: false, projectAndRepo: action.payload }
        case GET_PROJECT_AND_REPO_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}