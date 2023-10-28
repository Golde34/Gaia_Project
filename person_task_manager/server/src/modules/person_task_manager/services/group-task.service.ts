import { IResponse } from "../../../common/response";
import { msg200 } from "../../../common/response_helpers";
import { GroupTaskEntity } from "../entities/group-task.entity";
import { groupTaskValidation } from "../validations/validation";
import { projectService } from "./project.service";

const projectServiceImpl = projectService;
const groupTaskValidationImpl = groupTaskValidation;

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
        if (await !groupTaskValidationImpl.exitedGroupTaskId(groupTaskId)) {
            projectServiceImpl.updateProject(projectId, { $push: { groupTasks: groupTaskId } });
        }
        return msg200({
            message: (createGroupTask as any)
        });
    }

    async updateGroupTask(groupTaskId: string, groupTask: any): Promise<IResponse> {
        const updateGroupTask = await GroupTaskEntity.updateOne({ _id: groupTaskId }, groupTask);
        return msg200({
            message: (updateGroupTask as any)
        });
    }

    async deleteGroupTask(groupTaskId: string): Promise<IResponse> {
        const deleteGroupTask = await GroupTaskEntity.deleteOne({ _id: groupTaskId });
        if (await groupTaskValidationImpl.exitedGroupTaskId(groupTaskId)) {
            projectServiceImpl.updateProject(groupTaskId, { $pull: { groupTasks: groupTaskId } });
        }
        return msg200({
            message: (deleteGroupTask as any)
        });
    }

    async getTasks(groupTaskId: string): Promise<IResponse> {
        const getTasks = await GroupTaskEntity.findOne({ _id: groupTaskId }).populate('tasks');
        return msg200({
            message: (getTasks as any)
        });
    }

}

export const groupTaskService = new GroupTaskService();