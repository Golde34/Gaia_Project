import { HttpMethods, serverRequest } from "../../../baseAPI";
import {
    SCHEDULE_TASK_LIST_FAILURE, SCHEDULE_TASK_LIST_REQUEST, SCHEDULE_TASK_LIST_SUCCESS,
    TASK_BATCH_LIST_FAILURE, TASK_BATCH_LIST_REQUEST, TASK_BATCH_LIST_SUCCESS
} from "../../constants/schedule_plan/schedule-task.constants"

const portName = {
    middleware: 'middlewarePort'
}

export const getScheduleTaskList = (userId) => async (dispatch) => {
    dispatch({ type: SCHEDULE_TASK_LIST_REQUEST, payload: userId });
    try {
        const { data } = await serverRequest(`/schedule-task/${userId}`, HttpMethods.GET, portName.middleware);
        if (data == null) {
            dispatch({
                type: SCHEDULE_TASK_LIST_FAILURE,
                payload: 'No schedule task found',
            });
            return
        }
        dispatch({ type: SCHEDULE_TASK_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: SCHEDULE_TASK_LIST_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const getScheduleTaskBatchList = (userId) => {
    return async (dispatch) => {
        dispatch({ type: TASK_BATCH_LIST_REQUEST, payload: userId });
        try {
            const { data } = await serverRequest(`/schedule-task/task-batch-list/${userId}`, HttpMethods.GET, portName.middleware);
            dispatch({ type: TASK_BATCH_LIST_SUCCESS, payload: data });
            return data.scheduleBatchTask;
        } catch (error) {
            const errorMessage = error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            dispatch({
                type: TASK_BATCH_LIST_FAILURE,
                payload: errorMessage,
            });
            throw error;
        }
    }
}
