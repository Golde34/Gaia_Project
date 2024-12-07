import { SCHEDULE_TASK_LIST_FAILURE, SCHEDULE_TASK_LIST_REQUEST, SCHEDULE_TASK_LIST_SUCCESS } from "../../constants/schedule_task/schedule-task.constants";

export const scheduleTaskListReducer = (
    state = { loading: true }, action) => {
    switch (action.type) {
        case SCHEDULE_TASK_LIST_REQUEST:
            return { loading: true };
        case SCHEDULE_TASK_LIST_SUCCESS:
            return { loading: false, scheduleTasks: action.payload.scheduleTasks };
        case SCHEDULE_TASK_LIST_FAILURE:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}