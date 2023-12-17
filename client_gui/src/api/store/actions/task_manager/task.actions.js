import { HttpMethods, serverRequest } from '../../../baseAPI';
import { TASK_LIST_REQUEST, TASK_LIST_SUCCESS, TASK_LIST_FAIL, 
    TASK_DETAIL_REQUEST, TASK_DETAIL_SUCCESS, TASK_DETAIL_FAIL, 
    TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS, TASK_CREATE_FAIL,
    TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS, TASK_UPDATE_FAIL, 
    TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DELETE_FAIL, 
    TASK_GENERATE_REQUEST, TASK_GENERATE_FAIL, TASK_GENERATE_SUCCESS, 
    TASK_COMPLETED_REQUEST, TASK_COMPLETED_SUCCESS, TASK_COMPLETED_FAIL, 
    TOP_TASK_REQUEST, TOP_TASK_SUCCESS, TOP_TASK_FAIL, 
    MOVE_TASK_REQUEST, MOVE_TASK_SUCCESS, MOVE_TASK_FAIL
} from '../../constants/task_manager/task.constants';

const portName = {
    taskManager: 'taskManagerPort',
}

export const getTaskList = (groupTaskId) => async (dispatch) => {
    dispatch({ type: TASK_LIST_REQUEST, payload: groupTaskId });
    try {
        const { data } = await serverRequest(`/group-task/${groupTaskId}/tasks`, HttpMethods.GET, portName.taskManager);
        dispatch({ type: TASK_LIST_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TASK_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const getDetailTask = (taskId) => async (dispatch) => {
    dispatch({ type: TASK_DETAIL_REQUEST, payload: taskId });
    try {
        const { data } = await serverRequest(`/task/${taskId}`, HttpMethods.GET, portName.taskManager);
        dispatch({ type: TASK_DETAIL_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TASK_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const createTask = (task) => async (dispatch) => {
    dispatch({ type: TASK_CREATE_REQUEST, payload: task });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest('/task/create', HttpMethods.POST, portName.taskManager, task);
        dispatch({ type: TASK_CREATE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updateTask = (task) => async (dispatch) => {
    dispatch({ type: TASK_UPDATE_REQUEST, payload: task });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest(`/task/${task._id}`, HttpMethods.PUT, portName.taskManager, task);
        dispatch({ type: TASK_UPDATE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const deleteTask = (taskId) => async (dispatch) => {
    dispatch({ type: TASK_DELETE_REQUEST, payload: taskId });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest(`/task/${taskId}`, HttpMethods.DELETE, portName.taskManager);
        dispatch({ type: TASK_DELETE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const generateTaskFromScratch = (task) => async (dispatch) => {
    dispatch({ type: TASK_GENERATE_REQUEST, payload: task });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // } 
        const { data } = await serverRequest('/task/generate', HttpMethods.POST, portName.taskManager, task);
        dispatch({ type: TASK_GENERATE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TASK_GENERATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updateTaskInDialog = (task) => async (dispatch) => {
    dispatch({ type: TASK_UPDATE_REQUEST, payload: task });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest(`/task/update-task-in-dialog/${task._id}`, HttpMethods.PUT, portName.taskManager, task);
        dispatch({ type: TASK_UPDATE_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const getTasksCompleted = (groupTaskId) => async (dispatch) => {
    dispatch({ type: TASK_COMPLETED_REQUEST, payload: groupTaskId });
    try {
        const { data } = await serverRequest(`/group-task/${groupTaskId}/tasks-complete`, HttpMethods.GET, portName.taskManager);
        dispatch({ type: TASK_COMPLETED_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TASK_COMPLETED_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getTopTasks = (groupTaskId) => async (dispatch) => {
    dispatch({ type: TOP_TASK_REQUEST, payload: groupTaskId });
    try {
        const { data } = await serverRequest(`/dashboard/top-tasks`, HttpMethods.GET, portName.taskManager);
        dispatch({ type: TOP_TASK_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: TOP_TASK_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const moveTask = (taskId, oldGroupTaskId, newGroupTaskId) => async (dispatch) => {
    dispatch({ type: MOVE_TASK_REQUEST });
    try {
        const { data } = await serverRequest(`/task/${taskId}/move-task`, HttpMethods.PUT, portName.taskManager, { oldGroupTaskId, newGroupTaskId });
        dispatch({ type: MOVE_TASK_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({ 
            type: MOVE_TASK_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}