import { HttpMethods, serverRequest } from "../../../baseAPI";
import {
    COMMENT_CREATE_FAIL, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS,
    COMMENT_DELETE_FAIL, COMMENT_DELETE_REQUEST, COMMENT_DELETE_SUCCESS,
    COMMENT_DETAIL_FAIL, COMMENT_DETAIL_REQUEST, COMMENT_DETAIL_SUCCESS,
    COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS,
    COMMENT_UPDATE_FAIL, COMMENT_UPDATE_REQUEST, COMMENT_UPDATE_SUCCESS
} from "../../constants/task_manager/comment.constants";

const portName = {
    taskManager: 'taskManagerPort'
}

export const getCommentList = (taskId) => async (dispatch) => {
    dispatch({ type: COMMENT_LIST_REQUEST, payload: taskId });
    try {
        const { data } = await serverRequest(`/task/${taskId}/comments`, HttpMethods.GET, portName.taskManager);
        dispatch({ type: COMMENT_LIST_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: COMMENT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const getDetailComment = (commentId) => async (dispatch) => {
    dispatch({ type: COMMENT_DETAIL_REQUEST, payload: commentId });
    try {
        const { data } = await serverRequest(`/comment/${commentId}`, HttpMethods.GET, portName.taskManager);
        dispatch({ type: COMMENT_DETAIL_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: COMMENT_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const createComment = (comment) => async (dispatch) => {
    dispatch({ type: COMMENT_CREATE_REQUEST, payload: comment });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest('/comment/create', HttpMethods.POST, portName.taskManager, comment);
        dispatch({ type: COMMENT_CREATE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: COMMENT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updateComment = (comment) => async (dispatch) => {
    dispatch({ type: COMMENT_UPDATE_REQUEST, payload: comment });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //     'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest(`/comment/${comment._id}`, HttpMethods.PUT, portName.taskManager, comment);
        dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: COMMENT_UPDATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    dispatch({ type: COMMENT_DELETE_REQUEST, payload: commentId });
    try {
        // header is here maybe need it
        // const { userSignin: { userInfo } } = getState();
        // const header = {
        //     'Content-Type': 'multipart/form-data',
        //    'Authorization': `Bearer ${userInfo.token}`
        // }
        const { data } = await serverRequest(`/comment/${commentId}`, HttpMethods.DELETE, portName.taskManager);
        dispatch({ type: COMMENT_DELETE_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: COMMENT_DELETE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}