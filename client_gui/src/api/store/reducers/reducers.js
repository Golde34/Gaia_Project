import { combineReducers } from "redux";
import {
    userSigninReducer,
    gaiaSigninReducer,
    bossSigninReducer,
} from './auth_service/auth.reducer'

import { projectCreateReducer, projectDeleteReducer, projectDetailReducer,
    projectListReducer, projectUpdateReducer } from './task_manager/project.reducers'
import { groupTaskCreateReducer, groupTaskDeleteReducer, groupTaskDetailReducer,
    groupTaskListReducer, groupTaskUpdateReducer } from './task_manager/group-task.reducers'
import { moveTaskReducer, taskCompletedReducer, taskCreateReducer, taskDeleteReducer, taskDetailReducer, 
    taskListReducer, taskTableReducer, taskUpdateReducer, topTaskReducer } from './task_manager/task.reducers'
import { subTaskCreateReducer, subTaskDeleteReducer, subTaskDetailReducer, 
    subTaskListReducer, subTaskUpdateReducer } from './task_manager/sub-task.reducers'
import { commentCreateReducer, commentDeleteReducer, commentDetailReducer, 
    commentListReducer, commentUpdateReducer } from './task_manager/comment.reducers'
import { microserviceListReducer } from "./middleware_loader/microservices.reducer";
import { userListReducer, userUpdateReducer } from "./auth_service/user.reducer";
import { roleCreateReducer, roleListReducer } from "./auth_service/role.reducer";
import { privilegeListReducer } from "./auth_service/privilege.reducer";
import { queryTaskConfigReducer, registerTaskConfigReducer } from "./task_manager/task-registration.reducers";
import { noteCreateReducer, noteDetailReducer, noteListReducer, noteLockReducer, noteUnlockReducer, noteUpdateReducer } from "./task_manager/note.reducers"; 

export const reducer = combineReducers({
    // auth service
    gaiaSignin: gaiaSigninReducer,
    bossSignin: bossSigninReducer,
    userSignin: userSigninReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    roleList: roleListReducer,
    roleCreate: roleCreateReducer,
    privilegeList: privilegeListReducer,
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
    taskTable: taskTableReducer,
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
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteLock: noteLockReducer,
    noteUnlock: noteUnlockReducer,
    noteDetail: noteDetailReducer,  
    // middleware loader
    microserviceList: microserviceListReducer,
    // major flow
    registerTaskConfig: registerTaskConfigReducer,
    queryTaskConfig: queryTaskConfigReducer
})