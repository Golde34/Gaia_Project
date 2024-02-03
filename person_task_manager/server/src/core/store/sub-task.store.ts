import { UpdateWriteOpResult } from "mongoose";
import { subTaskRepository } from "../../infrastructure/repository/sub-task.repository";
import { ISubTaskEntity } from "../domain/entities/sub-task.entity";
import { DeleteResult } from "mongodb";

class SubTaskStore {
    constructor() {}

    async createSubTask(subTask: any): Promise<ISubTaskEntity> {
        return await subTaskRepository.createSubTask(subTask);
    }

    async updateSubTask(subTaskId: string, subTask: any): Promise<UpdateWriteOpResult> {
        return await subTaskRepository.updateSubTask(subTaskId, subTask);
    }

    async deleteSubTask(subTaskId: string): Promise<DeleteResult> {
        return await subTaskRepository.deleteSubTask(subTaskId);
    }

    async findSubTaskById(subTaskId: string): Promise<ISubTaskEntity | null> {
        return await subTaskRepository.findSubTaskById(subTaskId);
    }

    async findActiveSubTaskById(subTaskId: string): Promise<ISubTaskEntity | null> {
        return await subTaskRepository.findActiveSubTaskById(subTaskId);
    }

    async findInactiveSubTaskById(subTaskId: string): Promise<ISubTaskEntity | null> {
        return await subTaskRepository.findInactiveSubTaskById(subTaskId);
    }

    async archieveSubTask(subTaskId: string): Promise<UpdateWriteOpResult> {
        return await subTaskRepository.archieveSubTask(subTaskId);
    }

    async enableSubTask(subTaskId: string): Promise<UpdateWriteOpResult> {
        return await subTaskRepository.enableSubTask(subTaskId);
    }
}

export const subTaskStore = new SubTaskStore();