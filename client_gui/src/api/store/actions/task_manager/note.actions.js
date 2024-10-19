import { serverRequest } from "../../../baseAPI";
import { NOTE_CREATE_FAIL, NOTE_CREATE_REQUEST, NOTE_CREATE_SUCCESS, NOTE_LIST_FAIL, NOTE_LIST_REQUEST, NOTE_LIST_SUCCESS, NOTE_UPDATE_FAIL, NOTE_UPDATE_REQUEST, NOTE_UPDATE_SUCCESS } from "../../constants/task_manager/note.constants"

const portName = {
    middlweware: 'middlewarePort',
}

export const getNoteList = (userId) => async (dispatch) => {
    dispatch({ type: NOTE_LIST_REQUEST, payload: userId });
    try {
        const { data } = await serverRequest(`/note/${userId}`, 'GET', portName.middlweware);
        dispatch({ type: NOTE_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: NOTE_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const createNote = (note) => async (dispatch) => {
    dispatch({ type: NOTE_CREATE_REQUEST, payload: note });
    try {
        const { data } = await serverRequest('/note/create', 'POST', portName.middlweware, note);
        dispatch({ type: NOTE_CREATE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: NOTE_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updateNote = (note) => async (dispatch) => {
    dispatch({ type: NOTE_UPDATE_REQUEST, payload: note });
    try {
        const { data } = await serverRequest('/note/update', 'PUT', portName.middlweware, note);
        dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: NOTE_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}