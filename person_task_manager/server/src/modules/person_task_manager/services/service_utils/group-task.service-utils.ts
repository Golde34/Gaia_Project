import { GroupTaskEntity } from "../../entities/group-task.entity";
import { ProjectEntity } from "../../entities/project.entity";
import { TaskEntity } from "../../entities/task.entity";
import { groupTaskService } from "../group-task.service";
import { groupTaskValidation } from "../../validations/group-task.validation";

const groupTaskValidationImpl = groupTaskValidation;

class GroupTaskServiceUtils {
    constructor() { }

    async getGroupTaskByTaskId(taskId: string): Promise<string> {
        try {
            const groupTask = await GroupTaskEntity.findOne({ tasks: taskId });
            if (groupTask === null) {
                return 'Group Task not found';
            } else {
                return groupTask._id;
            }
        } catch (err: any) {
            console.log(err.message.toString());
            return 'error';
        }
    }

    async getGroupTaskByStatus(projectId: string, status: string): Promise<string[]> {
        try {
            const groupTasksInProject = await ProjectEntity.findOne({ _id: projectId }).populate('groupTasks').select('groupTasks');
            return groupTasksInProject[0].groupTasks.filter((groupTask: any) => groupTask.status === status).map((groupTask: any) => groupTask._id);
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

    async getOtherGropuTasksByEnteredStatus(projectId: string, status: string): Promise<string[]> {
        try {
            const groupTasksInProject = await ProjectEntity.findOne({ _id: projectId }).populate('groupTasks').select('groupTasks');
            return groupTasksInProject[0].groupTasks.filter((groupTask: any) => groupTask.status !== status).map((groupTask: any) => groupTask._id);
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

}

export const groupTaskServiceUtils = new GroupTaskServiceUtils();