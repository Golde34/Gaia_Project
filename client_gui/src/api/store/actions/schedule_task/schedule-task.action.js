import { HttpMethods, serverRequest } from "../../../baseAPI";
import { SCHEDULE_TASK_LIST_FAILURE, SCHEDULE_TASK_LIST_REQUEST, SCHEDULE_TASK_LIST_SUCCESS } from "../../constants/schedule_task/schedule-task.constants"

const portName = {
    middleware: 'middlewarePort'
}

export const getScheduleTaskList = (userId) => async (dispatch) => {
    dispatch({ type: SCHEDULE_TASK_LIST_REQUEST, payload: userId });
    try {
        const { data } = await serverRequest(`/schedule-task/${userId}`, HttpMethods.GET, portName.middleware);
        dispatch({ type: SCHEDULE_TASK_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: SCHEDULE_TASK_LIST_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}