import { UpdateWriteOpResult } from "mongoose";
import { taskRepository } from "../../infrastructure/repository/task.repository";
import { DeleteResult } from "mongodb";
import { ITaskEntity } from "../../infrastructure/entities/task.entity";

class TaskStore {
    constructor() { }

    async createTask(task: any): Promise<ITaskEntity> {
        return await taskRepository.createTask(task);
    }

    async updateTask(taskId: string, task: any): Promise<UpdateWriteOpResult> {
        return await taskRepository.updateTask(taskId, task);
    }

    async deleteTask(taskId: string): Promise<DeleteResult> {
        return await taskRepository.deleteTask(taskId);
    }

    async findTaskById(taskId: string): Promise<ITaskEntity | null> {
        return await taskRepository.findOneTask(taskId);
    }

    async findTaskWithSubTasks(taskId: string): Promise<ITaskEntity | null> {
        return await taskRepository.findTaskWithSubTasks(taskId);
    }   

    async findTaskWithComments(taskId: string): Promise<ITaskEntity | null> {
        return await taskRepository.findTaskWithComments(taskId);
    }

    async findAllTasks(): Promise<ITaskEntity[]> {
        return await taskRepository.findAllTasks();
    }

    async pullSubTasksInTask(subTaskId: string): Promise<UpdateWriteOpResult> {
        return await taskRepository.pullSubTasksInTask(subTaskId);
    }

    async pullCommentsInTask(commentId: string): Promise<UpdateWriteOpResult> {
        return await taskRepository.pullCommentsInTask(commentId);
    }

    async findActiveTaskById(taskId: string): Promise<ITaskEntity | null> {
        return await taskRepository.findOneActiveTask(taskId);
    }

    async findInactiveTaskById(taskId: string): Promise<ITaskEntity | null> {
        return await taskRepository.findOneInactiveTask(taskId);
    }

    async archiveTask(taskId: string): Promise<UpdateWriteOpResult> {
        return await taskRepository.archiveTask(taskId);
    }

    async enableTask(taskId: string): Promise<UpdateWriteOpResult> {
        return await taskRepository.enableTask(taskId);
    }

    async getTopTasks(limit: number): Promise<ITaskEntity[] | null> {
        return await taskRepository.getTopTasks(limit);
    }
}

export const taskStore = new TaskStore();