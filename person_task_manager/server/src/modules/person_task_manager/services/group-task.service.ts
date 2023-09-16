import { IResponse } from "../../../common/response";
import { msg200 } from "../../../common/response_helpers";
import { GroupTaskEntity } from "../entities/group-task.entity";

export class GroupTaskService {
    constructor() {
    }
    async getGroupTask(groupTaskId: string): Promise<IResponse> {
        const groupTask = await GroupTaskEntity.findOne({ _id: groupTaskId });
        return msg200({
            groupTask
        });
    }
    async getAllGroupTasks(): Promise<IResponse> {
        const groupTasks = await GroupTaskEntity.find();
        return msg200({
            groupTasks
        });
    }
    async createGroupTask(groupTask: any): Promise<IResponse> {
        const createGroupTask = await GroupTaskEntity.create(groupTask);
        return msg200({
            message: (createGroupTask as any).message
        });
    }
}

export const groupTaskService = new GroupTaskService();