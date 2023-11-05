import { HttpMethods, serverRequest } from "../../../api/baseAPI";
import { SUB_TASK_LIST_REQUEST, SUB_TASK_LIST_SUCCESS, SUB_TASK_LIST_FAIL, 
    SUB_TASK_DETAIL_REQUEST, SUB_TASK_DETAIL_SUCCESS, SUB_TASK_DETAIL_FAIL, 
    SUB_TASK_CREATE_REQUEST, SUB_TASK_CREATE_SUCCESS, SUB_TASK_CREATE_FAIL,
    SUB_TASK_UPDATE_REQUEST, SUB_TASK_UPDATE_SUCCESS, SUB_TASK_UPDATE_FAIL, 
    SUB_TASK_DELETE_REQUEST, SUB_TASK_DELETE_SUCCESS, SUB_TASK_DELETE_FAIL
} from "../../constants/task_manager/sub-task.constants";

const portName = {
    taskManager: 'task-manager'
}

export const getSubTaskList = (taskId) => async (dispatch) => {
    dispatch({ type: SUB_TASK_LIST_REQUEST, payload: taskId });
    try {
        const { data } = await serverRequest(`/task/${taskId}/sub-tasks`, HttpMethods.GET, portName.taskManager);
        dispatch({ type: SUB_TASK_LIST_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: SUB_TASK_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const getDetailSubTask = (subTaskId) => async (dispatch) => {
    dispatch({ type: SUB_TASK_DETAIL_REQUEST, payload: subTaskId });
    try {
        const { data } = await serverRequest(`/sub-task/${subTaskId}`, HttpMethods.GET, portName.taskManager);
        dispatch({ type: SUB_TASK_DETAIL_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: SUB_TASK_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const createSubTask = (subTask) => async (dispatch) => {
    dispatch({ type: SUB_TASK_CREATE_REQUEST, payload: subTask });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest('/sub-task/create', HttpMethods.POST, portName.taskManager, subTask);
        dispatch({ type: SUB_TASK_CREATE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: SUB_TASK_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updateSubTask = (subTask) => async (dispatch) => {
    dispatch({ type: SUB_TASK_UPDATE_REQUEST, payload: subTask });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest(`/sub-task/${subTask._id}`, HttpMethods.PUT, portName.taskManager, subTask);
        dispatch({ type: SUB_TASK_UPDATE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: SUB_TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const deleteSubTask = (subTaskId) => async (dispatch) => {
    dispatch({ type: SUB_TASK_DELETE_REQUEST, payload: subTaskId });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest(`/sub-task/${subTaskId}`, HttpMethods.DELETE, portName.taskManager);
        dispatch({ type: SUB_TASK_DELETE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: SUB_TASK_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}