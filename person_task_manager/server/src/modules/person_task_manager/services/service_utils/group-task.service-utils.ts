import { GroupTaskEntity, IGroupTaskEntity } from "../../entities/group-task.entity";
import { ProjectEntity } from "../../entities/project.entity";
import { TaskEntity } from "../../entities/task.entity";
import { groupTaskService } from "../group-task.service";
import { groupTaskValidation } from "../../validations/group-task.validation";

const groupTaskValidationImpl = groupTaskValidation;

class GroupTaskServiceUtils {
    constructor() { }

    async getGroupTaskByStatus(projectId: string, status: string): Promise<IGroupTaskEntity[]> {
        try {
            const groupTasks = await ProjectEntity.findOne({ _id: projectId }).populate('groupTasks');

            const groupTasksByStatus: IGroupTaskEntity[] = [];
            groupTasks?.groupTasks.forEach((groupTask: any) => {
                if (typeof groupTask !== 'string' && groupTask.status === status) {
                    groupTasksByStatus.push(groupTask);
                }
            });

            return groupTasksByStatus;
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

    async getOtherGropuTasksByEnteredStatus(projectId: string, status: string): Promise<IGroupTaskEntity[]> {
        try {
            const groupTasks = await ProjectEntity.findOne({ _id: projectId }).populate('groupTasks');
            
            const groupTasksByStatus: IGroupTaskEntity[] = [];
            groupTasks?.groupTasks.forEach((groupTask: any) => {
                if (typeof groupTask !== 'string' && groupTask.status !== status) {
                    groupTasksByStatus.push(groupTask);
                }
            });

            return groupTasksByStatus;
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

}

export const groupTaskServiceUtils = new GroupTaskServiceUtils();