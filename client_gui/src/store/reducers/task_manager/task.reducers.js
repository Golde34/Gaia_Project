import {
    TASK_CREATE_FAIL, TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS,
    TASK_DELETE_FAIL, TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS,
    TASK_DETAIL_FAIL, TASK_DETAIL_REQUEST, TASK_DETAIL_SUCCESS,
    TASK_GENERATE_FAIL, TASK_GENERATE_REQUEST, TASK_GENERATE_SUCCESS,
    TASK_LIST_FAIL, TASK_LIST_REQUEST, TASK_LIST_SUCCESS,
    TASK_UPDATE_FAIL, TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS
} from '../../constants/task_manager/task.constants';

export const taskListReducer = (
    state = { loading: true, tasks: [] },
    action
) => {
    switch (action.type) {
        case TASK_LIST_REQUEST:
            return { loading: true };
        case TASK_LIST_SUCCESS:
            return { loading: false, tasks: action.payload.tasks };
        case TASK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const taskDetailReducer = (
    state = { loading: true }, action) => {
    switch (action.type) {
        case TASK_DETAIL_REQUEST:
            return { loading: true };
        case TASK_DETAIL_SUCCESS:
            return { loading: false, task: action.payload.task };
        case TASK_DETAIL_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const taskCreateReducer = (
    state = {}, action) => {
    switch (action.type) {
        case TASK_CREATE_REQUEST:
            return { loading: true };
        case TASK_CREATE_SUCCESS:
            return { loading: false, task: action.payload.task };
        case TASK_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const taskUpdateReducer = (
    state = {}, action) => {
    switch (action.type) {
        case TASK_UPDATE_REQUEST:
            return { loading: true };
        case TASK_UPDATE_SUCCESS:
            return { loading: false, task: action.payload.task };
        case TASK_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const taskDeleteReducer = (
    state = {}, action) => {
    switch (action.type) {
        case TASK_DELETE_REQUEST:
            return { loading: true };
        case TASK_DELETE_SUCCESS:
            return { loading: false, task: action.payload.task };
        case TASK_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const generateTaskFromScratchReducer = (
    state = {}, action) => {
    switch (action.type) {
        case TASK_GENERATE_REQUEST:
            return { loading: true };
        case TASK_GENERATE_SUCCESS:
            return { loading: false, task: action.payload.task };
        case TASK_GENERATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}