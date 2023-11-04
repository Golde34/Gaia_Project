import { Axios } from "axios";
import { HttpMethods, serverRequest } from "../../../api/baseAPI";
import { PROJECT_LIST_FAIL, PROJECT_LIST_REQUEST, PROJECT_LIST_SUCCESS } from "../../constants/task_manager/projectConstants";

const portName = {
    taskManager: 'taskManagerPort',
}

export const getProjects = () => async (dispatch) => {
    dispatch({ type: PROJECT_LIST_REQUEST });
    try {
        console.log('getProjects');
        const { data } = await serverRequest('/project/all', HttpMethods.GET, portName.taskManager, null);      
        console.log(data);
        dispatch({ type: PROJECT_LIST_SUCCESS, payload: data.message });
    } catch (error) {
        console.log(error);
        dispatch({
            type: PROJECT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}