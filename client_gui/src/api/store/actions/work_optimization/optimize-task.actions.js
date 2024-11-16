import { HttpMethods, serverRequest } from "../../../baseAPI";
import { OPTIMZE_TASK_BY_USER_FAILURE, OPTIMZE_TASK_BY_USER_REQUEST, OPTIMZE_TASK_BY_USER_SUCCESS } from "../../constants/work_optimization/optimize-task.option";

const portName = {
    middlewarePort: 'middlewarePort'
}

export const optimizeTaskByUserId = (userId) => async (dispatch) => {
    dispatch({ type: OPTIMZE_TASK_BY_USER_REQUEST, payload: userId });
    try {
        const { data } = await serverRequest(`/task-optimization/optimize-task-by-user/${userId}`,
            HttpMethods.POST,
            portName.middlewarePort);
        console.log(data);
        dispatch({ type: OPTIMZE_TASK_BY_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: OPTIMZE_TASK_BY_USER_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}