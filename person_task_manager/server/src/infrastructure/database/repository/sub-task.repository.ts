import { UpdateWriteOpResult } from "mongoose";
import { SubTaskEntity } from "../model-repository/sub-task.entity";
import { ActiveStatus } from "../../../core/domain/enums/enums";
import { DeleteResult } from "mongodb";
import { ISubTaskEntity } from "../../../core/domain/entities/sub-task.entity";

class SubTaskRepository {
    constructor() {}

    async createSubTask(subTask: any): Promise<ISubTaskEntity> {
        return await SubTaskEntity.create(subTask);
    }

    async updateSubTask(subTaskId: string, subTask: any): Promise<UpdateWriteOpResult> {
        return await SubTaskEntity.updateOne({ _id: subTaskId }, subTask);
    }

    async deleteSubTask(subTaskId: string): Promise<DeleteResult> {
        return await SubTaskEntity.deleteOne({ _id: subTaskId });
    }

    async findSubTaskById(subTaskId: string): Promise<ISubTaskEntity | null> {
        return await SubTaskEntity.findOne({ _id: subTaskId });
    }

    async findActiveSubTaskById(subTaskId: string): Promise<ISubTaskEntity | null> {
        return await SubTaskEntity.findOne({ _id: subTaskId, activeStatus: ActiveStatus.active });
    }

    async findInactiveSubTaskById(subTaskId: string): Promise<ISubTaskEntity | null> {
        return await SubTaskEntity.findOne({ _id: subTaskId, activeStatus: ActiveStatus.inactive });
    }

    async archiveSubTask(subTaskId: string): Promise<UpdateWriteOpResult> {
        return await SubTaskEntity.updateOne({ _id: subTaskId }, { activeStatus: ActiveStatus.inactive });
    }

    async enableSubTask(subTaskId: string): Promise<UpdateWriteOpResult> {
        return await SubTaskEntity.updateOne({ _id: subTaskId }, { activeStatus: ActiveStatus.active });
    }
}

export const subTaskRepository = new SubTaskRepository();