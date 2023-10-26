import { HydratedDocument } from "mongoose";
import { ITaskEntity, TaskEntity } from "../entities/task.entity";
import { msg200 } from "../../../common/response_helpers";
import { IResponse } from "../../../common/response";
import { GroupTaskEntity } from "../entities/group-task.entity";

class TaskService {
    constructor() {}

    async getTask(taskId: string): Promise<IResponse> {
        const task = await TaskEntity.findOne({ _id: taskId });
        return msg200({
            task
        });
    }

    async createTaskInGroupTask(task: any, groupTaskId: string): Promise<IResponse> {
        const createTask = await TaskEntity.create(task);
        const taskId = (createTask as any)._id;
        const taskUpdate = await TaskEntity.updateOne({ _id: taskId }, { $push: { groupTasks: groupTaskId } });
        return msg200({
            message: (taskUpdate as any).message
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

    async getSubTasks(taskId: string): Promise<IResponse> {
        const getSubTasks = await TaskEntity.findOne({ _id: taskId }).populate('subTasks');
        return msg200({
            message: (getSubTasks as any).message
        });
    }

    async getComments(taskId: string): Promise<IResponse> {
        const getComments = await TaskEntity.findOne({ _id: taskId }).populate('comments');
        return msg200({
            message: (getComments as any).message
        });
    }

    // This fucntion is for boss only
    async getAllTasks(): Promise<IResponse> {
        const tasks = await TaskEntity.find();
        return msg200({
            tasks
        });
    }
}

export const taskService = new TaskService();