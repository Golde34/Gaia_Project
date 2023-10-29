import { IResponse } from "../../../common/response";
import { msg200, msg400 } from "../../../common/response_helpers";
import { SubTaskEntity } from "../entities/sub-task.entity";
import { TaskEntity } from "../entities/task.entity";
import { subTaskValidation } from "../validations/sub-task.validation";
import { taskService } from "./task.service";

const taskServiceImpl = taskService;
const subTaskValidationImpl = subTaskValidation;

class SubTaskService {
    constructor() {}

    async createSubTask(subTask: any, taskId: string): Promise<IResponse> {
        const createSubTask = await SubTaskEntity.create(subTask);
        const subTaskId = (createSubTask as any)._id;
        if (await !subTaskValidationImpl.checkExistedSubTaskInTask(subTaskId, taskId)) {
            taskServiceImpl.updateTask(taskId, { $push: { subTasks: subTaskId } });
        }

        return msg200({
            message: (createSubTask as any)
        });
    }

    async updateSubTask(subTaskId: string, subTask: any): Promise<IResponse> {
        try {
            if (await subTaskValidationImpl.checkExistedSubTaskBySubTaskId(subTaskId)) {
                const updateSubTask = await SubTaskEntity.updateOne({ _id: subTaskId }, subTask);
                return msg200({
                    message: (updateSubTask as any)
                });
            } else {
                return msg400('Sub task not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async deleteSubTask(subTaskId: string): Promise<IResponse> {
        try {
            if (await subTaskValidationImpl.checkExistedSubTaskBySubTaskId(subTaskId)) {
                const deleteSubTask = await SubTaskEntity.deleteOne({ _id: subTaskId });
                if (await subTaskValidationImpl.checkExistedSubTaskBySubTaskId(subTaskId)) {
                    taskServiceImpl.updateManyTasks({ data: { subTasks: subTaskId } }, 
                        { $pull: { subTasks: subTaskId } });
                }

                return msg200({
                    message: (deleteSubTask as any)
                });
            } else {
                return msg400('Sub task not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async getSubTask(subTaskId: string): Promise<IResponse> {
        const subTask = await SubTaskEntity.findOne({ _id: subTaskId });
        return msg200({
            subTask
        });
    }
}

export const subTaskService = new SubTaskService();