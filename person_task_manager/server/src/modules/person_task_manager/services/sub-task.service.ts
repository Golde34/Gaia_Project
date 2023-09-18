import { IResponse } from "../../../common/response";
import { msg200 } from "../../../common/response_helpers";
import { SubTaskEntity } from "../entities/sub-task.entity";

export class SubTaskService {
    constructor() {}
    
    async getSubTask(subTaskId: string): Promise<IResponse> {
        const subTask = await SubTaskEntity.findOne({ _id: subTaskId });
        return msg200({
            subTask
        });
    }

    async getAllSubTasks(): Promise<IResponse> {
        const subTasks = await SubTaskEntity.find();
        return msg200({
            subTasks
        });
    }

    async createSubTask(subTask: any): Promise<IResponse> {
        const createSubTask = await SubTaskEntity.create(subTask);
        return msg200({
            message: (createSubTask as any).message
        });
    }

    async updateSubTask(subTaskId: string, subTask: any): Promise<IResponse> {
        const updateSubTask = await SubTaskEntity.updateOne({_id: subTaskId}, subTask);
        return msg200({
            message: (updateSubTask as any).message
        });
    }

    async deleteSubTask(subTaskId: string): Promise<IResponse> {
        const deleteSubTask = await SubTaskEntity.deleteOne({_id: subTaskId});
        return msg200({
            message: (deleteSubTask as any).message
        });
    }
}