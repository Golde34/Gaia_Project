import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response-helpers";
import { TaskRequestDto } from "../domain/dtos/task.dto";
import { IsPrivateRoute } from "../domain/enums/enums";
import { taskService } from "../services/task.service";
import { buildCommonStringValue } from "../../kernel/util/string-utils";
import { GetGroupTaskProject } from "../domain/dtos/request_dtos/get-group-task-project.dto";
import { projectService } from "../services/project.service";
import { groupTaskService } from "../services/group-task.service";

class TaskUsecase {
    constructor() { }

    async createTaskInGroupTask(task: TaskRequestDto, groupTaskId: string | undefined, isPrivate: IsPrivateRoute): Promise<IResponse> {
        try {
            // validate
            if (groupTaskId === undefined) return msg400('Group task not found');
            // convert
            if (task.priority) {
                task.priority = task.priority.map((item) => buildCommonStringValue(item.toString()));
            }
            const createdTask = await taskService.createTaskInGroupTask(task);
            const taskResult = await taskService.handleAfterCreateTask(createdTask, groupTaskId);
            if (isPrivate === IsPrivateRoute.PUBLIC) {
                await taskService.pushKafkaToCreateTask(createdTask, groupTaskId);
            }
            return taskResult;
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }

    async getGroupTaskAndProject(taskId: string, groupTaskProjectObj: GetGroupTaskProject): Promise<IResponse> {
        try {
            // Check project existed by name
            const closestProject = await projectService.getProjectByName(groupTaskProjectObj.userId, groupTaskProjectObj.project);
            if (closestProject === undefined) return msg400('Project not found');
            // Check project existed by name
            const closestGroupTask = await groupTaskService.getGroupTaskByName(closestProject, groupTaskProjectObj.groupTask);
            if (closestGroupTask === undefined) return msg400('Group task not found');
            // Verify taskId in groupTask in project
            const taskInGroupTask = await taskService.checkExistedTask(taskId, closestGroupTask);
            if (taskInGroupTask === true) {
                const mapGetGroupTaskProject = {
                    groupTaskId: closestGroupTask._id,
                    groupTaskName: closestGroupTask.title,
                    projectId: closestProject._id,
                    projectName: closestProject.name
                } 
                return msg200(mapGetGroupTaskProject);
            }
            return msg400('Task not existed in group task');
        } catch (err: any) {
            console.log("Could not get group task and project: ", err);
            return msg400(err.message.toString());
        }
    }
}

export const taskUsecase = new TaskUsecase();