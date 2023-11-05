import { SUB_TASK_CREATE_FAIL, SUB_TASK_CREATE_REQUEST, SUB_TASK_CREATE_SUCCESS, 
    SUB_TASK_DELETE_FAIL, SUB_TASK_DELETE_REQUEST, SUB_TASK_DELETE_SUCCESS, 
    SUB_TASK_DETAIL_FAIL, SUB_TASK_DETAIL_REQUEST, SUB_TASK_DETAIL_SUCCESS, 
    SUB_TASK_LIST_FAIL, SUB_TASK_LIST_REQUEST, SUB_TASK_LIST_SUCCESS, 
    SUB_TASK_UPDATE_FAIL, SUB_TASK_UPDATE_REQUEST, SUB_TASK_UPDATE_SUCCESS 
} from "../../constants/task_manager/sub-task.constants";

export const subTaskReducer = (
    state = { loading: true }, action) => {
    switch (action.type) {
        case SUB_TASK_LIST_REQUEST:
            return { loading: true };
        case SUB_TASK_LIST_SUCCESS:
            return { loading: false, subTask: action.payload.subTask };
        case SUB_TASK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const subTaskDetailReducer = (
    state = { loading: true }, action) => {
    switch (action.type) {
        case SUB_TASK_DETAIL_REQUEST:
            return { loading: true };
        case SUB_TASK_DETAIL_SUCCESS:
            return { loading: false, subTask: action.payload.subTask };
        case SUB_TASK_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const subTaskCreateReducer = (
    state = { }, action) => {
    switch (action.type) {
        case SUB_TASK_CREATE_REQUEST:
            return { loading: true };
        case SUB_TASK_CREATE_SUCCESS:
            return { loading: false, subTask: action.payload.subTask };
        case SUB_TASK_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const subTaskUpdateReducer = (
    state = { }, action) => {
    switch (action.type) {
        case SUB_TASK_UPDATE_REQUEST:
            return { loading: true };
        case SUB_TASK_UPDATE_SUCCESS:
            return { loading: false, subTask: action.payload.subTask };
        case SUB_TASK_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const subTaskDeleteReducer = (
    state = { }, action) => {
    switch (action.type) {
        case SUB_TASK_DELETE_REQUEST:
            return { loading: true };
        case SUB_TASK_DELETE_SUCCESS:
            return { loading: false, subTask: action.payload.subTask };
        case SUB_TASK_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}