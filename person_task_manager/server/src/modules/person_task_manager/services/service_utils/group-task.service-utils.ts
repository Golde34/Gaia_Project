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

    // calculate totalTasks, completedTasks
    async calculateTotalTasks(groupTaskId: string): Promise<IGroupTaskEntity> {
        try {
            if (await groupTaskValidationImpl.checkExistedGroupTaskById(groupTaskId) === true) {
                const groupTask = await GroupTaskEntity.findOne({ _id: groupTaskId });
                if (groupTask === null) {
                    throw new Error('Group task not found');
                } else {
                    const totalTasks = groupTask.tasks.length;
                    let completedTasks = 0;
                    for (let i = 0; i < groupTask.tasks.length; i++) {
                        const taskId = groupTask.tasks[i];
                        const task = await TaskEntity.findOne({ _id: taskId });
                        if (task !== null) {
                            if (task.status === 'DONE') {
                                completedTasks++;
                            }
                        } else {
                            continue;
                        }
                    }
                    groupTask.totalTasks = totalTasks;
                    groupTask.completedTasks = completedTasks;
                    await groupTask.save();
                   
                    return groupTask;
                }
            }
            throw new Error('Group task not found');
        } catch (error: any) {
            console.log(error.message.toString());
            throw new Error(error.message.toString());
        }
    }
}

export const groupTaskServiceUtils = new GroupTaskServiceUtils();