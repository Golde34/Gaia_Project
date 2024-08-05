import { HttpMethods, serverRequest } from "../../../baseAPI";
import { QUERY_TASK_CONFIG_FAIL, QUERY_TASK_CONFIG_REQUEST, QUERY_TASK_CONFIG_SUCCESS, 
    REGISTER_TASK_CONFIG_FAIL, REGISTER_TASK_CONFIG_REQUEST, REGISTER_TASK_CONFIG_SUCCESS } 
from "../../constants/task_manager/task-registration.constants";

const portName = {
    middlewarePort: 'middlewarePort'
}

export const queryTaskConfig = (userId) => async (dispatch) => {
    dispatch({ type: QUERY_TASK_CONFIG_REQUEST, payload: userId });
    try {
        const { data } = await serverRequest(`/work-optimization/query-task-config/${userId}`, HttpMethods.GET, portName.middlewarePort);
        dispatch({ type: QUERY_TASK_CONFIG_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: QUERY_TASK_CONFIG_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const registerTaskConfig = (taskConfig) => async (dispatch) => {
    dispatch({ type: REGISTER_TASK_CONFIG_REQUEST, payload: taskConfig });
    try {
        const { data } = await serverRequest('/work-optimization/register-task-config', HttpMethods.POST, portName.middlewarePort, taskConfig);
        dispatch({ type: REGISTER_TASK_CONFIG_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: REGISTER_TASK_CONFIG_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}