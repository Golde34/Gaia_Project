import { TaskEntity } from "../entities/task.entity"

export const taskValidation = {
    async checkExistedTaskByTaskId(taskId: string): Promise<boolean> {
        if (await TaskEntity.findOne({ _id: taskId }) != null) {
            return true; // existed
        }
        return false;
    },

    async checkExistedTaskByTitle(title: string): Promise<boolean> {
        if (await TaskEntity.findOne({ title: title }) != null) {
            return true; // existed
        }
        return false;
    },

    async checkExistedTaskInGroupTask(taskId: string, groupTaskId: string): Promise<boolean> {
        const groupTask = TaskEntity.findOne({ _id: groupTaskId, tasks: taskId });
        if (await groupTask != null) {
            return true; // existed
        }
        return false;
    },
}