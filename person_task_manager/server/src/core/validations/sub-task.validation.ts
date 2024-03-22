import { SubTaskEntity } from "../domain/entities/sub-task.entity";
import { TaskEntity } from "../domain/entities/task.entity";

export const subTaskValidation = {
    async checkExistedSubTaskBySubTaskId(subTaskId: string): Promise<boolean> {
        try {
            if (await SubTaskEntity.findOne({ _id: subTaskId }) != null) {
                return true; // existed
            }
            return false;
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedSubTaskByTitle(mission: string): Promise<boolean> {
        try {
            if (await SubTaskEntity.findOne({ mission: mission }) != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedSubTaskInTask(subTaskId: string, taskId: string): Promise<boolean> {
        try {
            const task = TaskEntity.findOne({ _id: taskId, subTasks: subTaskId });
            if (await task != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },
}