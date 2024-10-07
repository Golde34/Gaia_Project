import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response-helpers";
import { TaskRequestDto } from "../domain/dtos/task.dto";
import { IsPrivateRoute } from "../domain/enums/enums";
import { taskService } from "../services/task.service";
import { buildCommonStringValue } from "../../kernel/util/string-utils";
import { GetGroupTaskProject } from "../domain/dtos/request_dtos/get-group-task-project.dto";

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
            // Check groupTask existed by name
            // Check project existed by name
            // Verify taskId in groupTask in project
            // return groupTaskId, groupTaskName, projectId, projectName
            return msg200('OK')
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }
}

export const taskUsecase = new TaskUsecase();