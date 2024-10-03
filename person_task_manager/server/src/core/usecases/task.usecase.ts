import { IResponse } from "../common/response";
import { msg400 } from "../common/response-helpers";
import { TaskRequestDto } from "../domain/dtos/task.dto";
import { IsPrivateRoute } from "../domain/enums/enums";
import { taskService } from "../services/task.service";

class TaskUsecase {
    constructor() { }

    async createTaskInGroupTask(task: TaskRequestDto, groupTaskId: string | undefined): Promise<IResponse> {
        try {
            // validate
            if (groupTaskId === undefined) return msg400('Group task not found');
            const createdTask = await taskService.createTaskInGroupTask(task);
            const taskResult = await taskService.handleAfterCreateTask(createdTask, groupTaskId);
            await taskService.pushKafkaToCreateTask(createdTask, groupTaskId);
            return taskResult;
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }

    async createPrivateTask(task: TaskRequestDto, userId: string, groupTaskId: string | undefined): Promise<IResponse> {
        try {
            // validate
            if (groupTaskId === undefined) return msg400('Group task not found');
            const createdTask = await taskService.createTaskInGroupTask(task);
            return await taskService.handleAfterCreateTask(createdTask, groupTaskId);
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }
}

export const taskUsecase = new TaskUsecase();