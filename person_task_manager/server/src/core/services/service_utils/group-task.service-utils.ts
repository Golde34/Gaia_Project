import { IGroupTaskEntity } from "../../../infrastructure/database/entities/group-task.entity";
import { TaskEntity } from "../../../infrastructure/database/entities/task.entity";
import { GROUP_TASK_NOT_FOUND } from "../../domain/constants/error.constant";
import { Status } from "../../domain/enums/enums";
import { groupTaskStore } from "../../port/store/group-task.store";
import { projectStore } from "../../port/store/project.store";
import { groupTaskValidation } from "../../validations/group-task.validation";

const groupTaskValidationImpl = groupTaskValidation;

class GroupTaskServiceUtils {
    constructor() { }

    async getGroupTaskByStatus(projectId: string, status: string): Promise<IGroupTaskEntity[]> {
        try {
            const groupTasks = await projectStore.findOneProjectWithGroupTasks(projectId);

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
            const groupTasks = await projectStore.findOneProjectWithGroupTasks(projectId);

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
                const groupTask = await groupTaskStore.findGroupTaskById(groupTaskId);
                if (groupTask === null) {
                    throw new Error(GROUP_TASK_NOT_FOUND);
                } else {
                    const totalTasks = groupTask.tasks.length;
                    let completedTasks = 0;
                    for (let i = 0; i < groupTask.tasks.length; i++) {
                        const taskId = groupTask.tasks[i];
                        const task = await TaskEntity.findOne({ _id: taskId });
                        if (task !== null) {
                            if (task.status === Status.done) {
                                completedTasks++;
                            }
                        } else {
                            continue;
                        }
                    }
                    groupTask.totalTasks = totalTasks;
                    groupTask.completedTasks = completedTasks;
                    await groupTaskStore.updateGroupTask(groupTaskId, groupTask);
                   
                    return groupTask;
                }
            }
            throw new Error(GROUP_TASK_NOT_FOUND);
        } catch (error: any) {
            console.log(error.message.toString());
            throw new Error(error.message.toString());
        }
    }
}

export const groupTaskServiceUtils = new GroupTaskServiceUtils();