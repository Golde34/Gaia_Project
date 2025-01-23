import { HttpMethods, serverRequest } from "../../../baseAPI";
import { GET_PROJECT_AND_REPO_FAILURE, GET_PROJECT_AND_REPO_REQUEST, GET_PROJECT_AND_REPO_SUCCESS } from "../../constants/contribution_tracker/user-project.constants";

const portName = {
    middlewarePort: 'middlewarePort'
}

export const getProjectsAndRepos = (userId) => async (dispatch) => {
    dispatch({ type: GET_PROJECT_AND_REPO_REQUEST, payload: userId });
    try {
        const { data } = await serverRequest(`/user-commit/user-github/get-project-repo/${userId}`, HttpMethods.GET, portName.middlewarePort);
        dispatch({ type: GET_PROJECT_AND_REPO_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: GET_PROJECT_AND_REPO_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}
