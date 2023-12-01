import { GroupTaskEntity } from "../entities/group-task.entity";
import { ITaskEntity, TaskEntity } from "../entities/task.entity";

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
            const tasks = await GroupTaskEntity.findOne({ _id: groupTaskId }).populate('tasks').select('tasks');

            return tasks.filter((task: { status: string }) => task.status === status).map(async (task: { _id: string }) => {
                const taskEntity = await TaskEntity.findOne({ _id: task._id });
                return taskEntity;
            });
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }

    async getOtherTasksByEnteredStatus(groupTaskId: string, status: string): Promise < ITaskEntity[] > {
        try {
            const tasks = await GroupTaskEntity.findOne({ _id: groupTaskId }).populate('tasks').select('tasks');
        
            return tasks.filter((task: { status: string }) => task.status !== status).map(async (task: { _id: string }) => {
                const taskEntity = await TaskEntity.findOne({ _id: task._id });
                return taskEntity;
            });
        } catch (error: any) {
            console.log(error.message.toString());
            return [];
        }
    }
}

export const taskServiceUtils = new TaskServiceUtils();