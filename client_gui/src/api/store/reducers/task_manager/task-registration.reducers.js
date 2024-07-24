import { REGISTER_TASK_CONFIG_FAIL, REGISTER_TASK_CONFIG_REQUEST, REGISTER_TASK_CONFIG_SUCCESS }
from "../../constants/task_manager/task-registration.constants";

export const registerTaskConfigReducer = (
    state = { }, action) => {
    switch (action.type) {
        case REGISTER_TASK_CONFIG_REQUEST:
            return { loading: true };
        case REGISTER_TASK_CONFIG_SUCCESS:
            return { loading: false, taskConfig: action.payload.taskConfig };
        case REGISTER_TASK_CONFIG_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}