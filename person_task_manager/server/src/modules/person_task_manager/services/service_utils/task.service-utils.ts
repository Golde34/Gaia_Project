import { GroupTaskEntity } from "../../entities/group-task.entity";
import { ITaskEntity, TaskEntity } from "../../entities/task.entity";

class TaskServiceUtils {
    constructor() { }

    async getTaskBySubTaskId(subTaskId: string): Promise<string> {
        // pass
        return '';
    }

    async getTaskByCommentId(commentId: string): Promise<string> {
        // pass
        return '';
    }

    async getTaskByStatus(groupTaskId: string, status: string): Promise<ITaskEntity[]> {
        try {
            const tasks = await GroupTaskEntity.findOne({ _id: groupTaskId }).populate('tasks');

            const tasksByStatus: ITaskEntity[] = [];
            tasks?.tasks.forEach((task: any) => {
                if (typeof task !== 'string' && task.status === status) {
                    tasksByStatus.push(task);
                }
            });

            return tasksByStatus;
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

    async getOtherTasksByEnteredStatus(groupTaskId: string, status: string): Promise < ITaskEntity[] > {
        try {
            const tasks = await GroupTaskEntity.findOne({ _id: groupTaskId }).populate('tasks');
            
            const tasksByStatus: ITaskEntity[] = [];
            tasks?.tasks.forEach((task: any) => {
                if (typeof task !== 'string' && task.status !== status) {
                    tasksByStatus.push(task);
                }
            });

            return tasksByStatus;
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

    async orderTaskByPriority(tasks: ITaskEntity[]): Promise<ITaskEntity[]> {
        try {
            const tasksByPriority: ITaskEntity[] = [];
            return [];   
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }
}

export const taskServiceUtils = new TaskServiceUtils();