import { REGISTER_TASK_CONFIG_FAIL, REGISTER_TASK_CONFIG_REQUEST, REGISTER_TASK_CONFIG_SUCCESS } from "../../constants/task_manager/task-registration.constants";

export const registerTaskConfig = (taskConfig) => async (dispatch) => {
    dispatch({ type: REGISTER_TASK_CONFIG_REQUEST, payload: taskConfig });
    try {
        const { data } = await serverRequest('/task/register', HttpMethods.POST, portName.middlewarePort, taskConfig);
        dispatch({ type: REGISTER_TASK_CONFIG_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: REGISTER_TASK_CONFIG_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}