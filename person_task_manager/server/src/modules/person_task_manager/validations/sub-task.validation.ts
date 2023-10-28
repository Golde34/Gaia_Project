import { SubTaskEntity } from "../entities/sub-task.entity";
import { TaskEntity } from "../entities/task.entity";

export const subTaskValidation = {
    async checkExistedSubTaskBySubTaskId(subTaskId: string): Promise<boolean> {
        if (await SubTaskEntity.findOne({ _id: subTaskId }) != null) {
            return true; // existed
        }
        return false;
    },

    async checkExistedSubTaskByTitle(mission: string): Promise<boolean> {
        if (await SubTaskEntity.findOne({ mission: mission }) != null) {
            return true; // existed
        }
        return false;
    },

    async checkExistedSubTaskInTask(subTaskId: string, taskId: string): Promise<boolean> {
        const task = TaskEntity.findOne({ _id: taskId, subTasks: subTaskId });
        if (await task != null) {
            return true; // existed
        }
        return false;
    },
}