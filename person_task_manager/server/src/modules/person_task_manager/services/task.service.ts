import { HydratedDocument } from "mongoose";
import { ITaskEntity, TaskEntity } from "../entities/task.entity";
import { msg200 } from "../../../common/response_helpers";
import { IResponse } from "../../../common/response";
import { GroupTaskEntity } from "../entities/group-task.entity";

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

    async updateTask(taskId: string, task: any): Promise<IResponse> {
        const updateTask = await TaskEntity.updateOne({ _id: taskId }, task);
        return msg200({
            message: (updateTask as any).message
        });
    }    

    async deleteTask(taskId: string): Promise<IResponse> {
        const deleteTask = await TaskEntity.deleteOne({ _id: taskId });
        return msg200({
            message: (deleteTask as any).message
        });
    }

    async addTaskToGroupTask(taskId: string, groupTaskId: string): Promise<IResponse> {
        const groupTaskUpdate = await GroupTaskEntity.updateOne({ _id: groupTaskId }, { $push: { tasks: taskId } });
        return msg200({
            message: (groupTaskUpdate as any).message
        });
    }
}

export const taskService = new TaskService();