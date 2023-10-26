import { IResponse } from "../../../common/response";
import { msg200 } from "../../../common/response_helpers";
import { GroupTaskEntity } from "../entities/group-task.entity";

class GroupTaskService {
    constructor() {
    }
    
    async getGroupTask(groupTaskId: string): Promise<IResponse> {
        const groupTask = await GroupTaskEntity.findOne({ _id: groupTaskId });
        return msg200({
            groupTask
        });
    }

    async createGroupTaskToProject(groupTask: any, projectId: string): Promise<IResponse> {
        const createGroupTask = await GroupTaskEntity.create(groupTask);
        const groupTaskId = (createGroupTask as any)._id;
        const groupTaskUpdate = await GroupTaskEntity.updateOne({ _id: groupTaskId }, { $push: { projects: projectId } });
        return msg200({
            message: (groupTaskUpdate as any).message
        });
    }

    async updateGroupTask(groupTaskId: string, groupTask: any): Promise<IResponse> {
        const updateGroupTask = await GroupTaskEntity.updateOne({ _id: groupTaskId }, groupTask);
        return msg200({
            message: (updateGroupTask as any).message
        });
    }

    async deleteGroupTask(groupTaskId: string): Promise<IResponse> {
        const deleteGroupTask = await GroupTaskEntity.deleteOne({ _id: groupTaskId });
        return msg200({
            message: (deleteGroupTask as any).message
        });
    }

    async getTasks(groupTaskId: string): Promise<IResponse> {
        const getTasks = await GroupTaskEntity.findOne({ _id: groupTaskId }).populate('tasks');
        return msg200({
            message: (getTasks as any).message
        });
    }

}

export const groupTaskService = new GroupTaskService();