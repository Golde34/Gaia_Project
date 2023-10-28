import { commentService } from "../services/comment.service";
import { groupTaskService } from "../services/group-task.service";
import { projectService } from "../services/project.service";
import { subTaskService } from "../services/sub-task.service";
import { taskService } from "../services/task.service";

const projectServiceImpl = projectService;
const groupTaskServiceImpl = groupTaskService;
const taskServiceImpl = taskService;
const subTaskServiceImpl = subTaskService;
const commentServiceImpl = commentService;

export const groupTaskValidation = {
    async exitedGroupTaskId(groupTaskId: string) {
        // if true it is existed else not existed
        return await groupTaskServiceImpl.getGroupTask(groupTaskId)!=null;
    },
}

export const constTaskValidation = {
    async exitedTaskId(taskId: string) {
        // if true it is existed else not existed
        return await taskServiceImpl.getTask(taskId)!=null;
    },
}

export const subTaskValidation = {
    async exitedSubTaskId(subTaskId: string) {
        // if true it is existed else not existed
        return await subTaskServiceImpl.getSubTask(subTaskId)!=null;
    },
}

export const projectValidation = {
    async exitedProjectId(projectId: string) {
        // if true it is existed else not existed
        return await projectServiceImpl.getProject(projectId)!=null;
    },
}

export const commentValidation = {
    async exitedCommentId(commentId: string) {
        // if true it is existed else not existed
        return await commentServiceImpl.getComment(commentId)!=null;
    },
}