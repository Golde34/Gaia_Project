import { TaskEntity } from "../domain/entities/task.entity"

export const taskValidation = {
    async checkExistedTaskByTaskId(taskId: string): Promise<boolean> {
        try {
            if (await TaskEntity.findOne({ _id: taskId }) != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedTaskByTitle(title: string): Promise<boolean> {
        try {
            if (await TaskEntity.findOne({ title: title }) != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedTaskInGroupTask(taskId: string, groupTaskId: string): Promise<boolean> {
        try {
            const groupTask = TaskEntity.findOne({ _id: groupTaskId, tasks: taskId });
            if (await groupTask != null) {
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