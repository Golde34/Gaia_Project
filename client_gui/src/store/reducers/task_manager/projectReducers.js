import { PROJECT_LIST_FAIL, PROJECT_LIST_REQUEST, PROJECT_LIST_SUCCESS } from "../../constants/task_manager/projectConstants";

export const projectListReducer = (
    state = { loading: true, projects: [] }, 
    action
    ) => {
    switch (action.type) {
        case PROJECT_LIST_REQUEST:
            return { loading: true };
        case PROJECT_LIST_SUCCESS:
            return { loading: false, projects: action.payload.projects };
        case PROJECT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}