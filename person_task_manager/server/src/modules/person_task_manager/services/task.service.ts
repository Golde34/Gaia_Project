import { HydratedDocument } from "mongoose";
import { ITaskEntity, TaskEntity } from "../entities/task.entity";
import { msg200 } from "../../../common/response_helpers";
import { IResponse } from "../../../common/response";

export class TaskService {
    constructor() {}

    async getTask(taskId: string): Promise<IResponse> {
        const task = await TaskEntity.findOne({ _id: taskId });
        return msg200({
            task
        });
    }

    async getAllTasks(): Promise<IResponse> {
        const tasks = await TaskEntity.find();
        return msg200({
            tasks
        });
    }

    async createTask(task: any): Promise<IResponse> {
        const createTask = await TaskEntity.create(task);

        return msg200({
            message: (createTask as any).message
        });
 
    }
}

export const taskService = new TaskService();