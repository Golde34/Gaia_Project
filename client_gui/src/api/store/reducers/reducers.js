import { combineReducers } from "redux";
import {
    userSigninReducer,
    gaiaSigninReducer,
    bossSigninReducer,
} from './auth_service/userReducers'

import { projectCreateReducer, projectDeleteReducer, projectDetailReducer,
    projectListReducer, projectUpdateReducer } from './task_manager/project.reducers'
import { groupTaskCreateReducer, groupTaskDeleteReducer, groupTaskDetailReducer,
    groupTaskListReducer, groupTaskUpdateReducer } from './task_manager/group-task.reducers'
import { moveTaskReducer, taskCompletedReducer, taskCreateReducer, taskDeleteReducer, taskDetailReducer, 
    taskListReducer, taskUpdateReducer, topTaskReducer } from './task_manager/task.reducers'
import { subTaskCreateReducer, subTaskDeleteReducer, subTaskDetailReducer, 
    subTaskListReducer, subTaskUpdateReducer } from './task_manager/sub-task.reducers'
import { commentCreateReducer, commentDeleteReducer, commentDetailReducer, 
    commentListReducer, commentUpdateReducer } from './task_manager/comment.reducers'

export const reducer = combineReducers({
    // auth service
    gaiaSignin: gaiaSigninReducer,
    bossSignin: bossSigninReducer,
    userSignin: userSigninReducer,
    // task manager
    projectList: projectListReducer,
    projectDetail: projectDetailReducer,
    projectCreate: projectCreateReducer,
    projectUpdate: projectUpdateReducer,
    projectDelete: projectDeleteReducer,
    groupTaskList: groupTaskListReducer,
    groupTaskDetail: groupTaskDetailReducer,
    groupTaskCreate: groupTaskCreateReducer,
    groupTaskUpdate: groupTaskUpdateReducer,
    groupTaskDelete: groupTaskDeleteReducer,
    groupTaskUpdateName: groupTaskUpdateReducer,
    taskList: taskListReducer,
    taskDetail: taskDetailReducer,
    taskCreate: taskCreateReducer,
    taskUpdate: taskUpdateReducer,
    taskDelete: taskDeleteReducer,
    taskCompleted: taskCompletedReducer,
    movedTask: moveTaskReducer,
    topTask: topTaskReducer,
    subTaskList: subTaskListReducer,
    subTaskDetail: subTaskDetailReducer,
    subTaskCreate: subTaskCreateReducer,
    subTaskUpdate: subTaskUpdateReducer,
    subTaskDelete: subTaskDeleteReducer,
    commentList: commentListReducer,
    commentDetail: commentDetailReducer,
    commentCreate: commentCreateReducer,
    commentUpdate: commentUpdateReducer,
    commentDelete: commentDeleteReducer,
})