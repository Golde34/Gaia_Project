import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response_helpers";
import { SUB_TASK_NOT_FOUND } from "../domain/constants/error.constant";
import { SubTaskEntity } from "../domain/entities/sub-task.entity";
import { ActiveStatus } from "../domain/enums/enums";
import { subTaskStore } from "../store/sub-task.store";
import { subTaskValidation } from "../validations/sub-task.validation";
import { taskService } from "./task.service";

const taskServiceImpl = taskService;
const subTaskValidationImpl = subTaskValidation;

class SubTaskService {
    constructor() { }

    async createSubTask(subTask: any, taskId: string): Promise<IResponse> {
        try {
            const createSubTask = await subTaskStore.createSubTask(subTask);
            const subTaskId = (createSubTask as any)._id;

            if (await subTaskValidationImpl.checkExistedSubTaskInTask(subTaskId, taskId) === false) {
                taskServiceImpl.updateTask(taskId, { $push: { subTasks: subTaskId } });

                return msg200({
                    message: (createSubTask as any)
                });
            } else {
                await subTaskStore.deleteSubTask(subTaskId);
                return msg400('Sub task is not created successfully');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async updateSubTask(subTask: any, subTaskId: string): Promise<IResponse> {
        try {
            if (await subTaskValidationImpl.checkExistedSubTaskBySubTaskId(subTaskId) === true) {
                const updateSubTask = await subTaskStore.updateSubTask(subTaskId, subTask);
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
            if (await subTaskValidationImpl.checkExistedSubTaskBySubTaskId(subTaskId) === true) {
                const deleteSubTask = await subTaskStore.deleteSubTask(subTaskId);
                taskServiceImpl.updateManySubTasksInTask(subTaskId);

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
        const subTask = await subTaskStore.findSubTaskById(subTaskId);
        return msg200({
            subTask
        });
    }

    async archiveSubTask(subTaskId: string): Promise<IResponse | undefined> {
        try {
            if (await subTaskValidationImpl.checkExistedSubTaskBySubTaskId(subTaskId) === true) {
                const subTask = await subTaskStore.findActiveSubTaskById(subTaskId);
                if (subTask === null) {
                    return msg400(SUB_TASK_NOT_FOUND);
                } else {
                    await subTaskStore.archiveSubTask(subTaskId);
                    return msg200({
                        message: "Sub task archived"
                    });
                }
            }
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }

    async enableSubTask(subTaskId: string): Promise<IResponse | undefined> {
        try {
            if (await subTaskValidationImpl.checkExistedSubTaskBySubTaskId(subTaskId) === true) {
                const subTask = await subTaskStore.findInactiveSubTaskById(subTaskId);
                if (subTask === null) {
                    return msg400(SUB_TASK_NOT_FOUND);
                } else {
                    await subTaskStore.enableSubTask(subTaskId);
                    return msg200({
                        message: "Sub task enabled"
                    });
                }
            }
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }
}

export const subTaskService = new SubTaskService();