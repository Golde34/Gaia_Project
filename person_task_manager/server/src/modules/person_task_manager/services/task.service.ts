import { TaskEntity } from "../entities/task.entity";
import { msg200, msg400 } from "../../../common/response_helpers";
import { IResponse } from "../../../common/response";
import { taskValidation } from "../validations/task.validation";
import { groupTaskService } from "./group-task.service";

const groupTaskServiceImpl = groupTaskService;
const taskValidationImpl = taskValidation;

class TaskService {
    constructor() { }

    async createTaskInGroupTask(task: any, groupTaskId: string): Promise<IResponse> {
        try {
            task.createdAt = new Date();
            task.updatedAt = new Date();
            console.log(task)
            const createTask = await TaskEntity.create(task);
            const taskId = (createTask as any)._id;
            if (await taskValidationImpl.checkExistedTaskInGroupTask(taskId, groupTaskId) === false) {
                groupTaskServiceImpl.updateGroupTask(groupTaskId, { $push: { tasks: taskId } });
            
                return msg200({
                    message: (createTask as any)
                });
            } else {
                const deletedInitTask = await TaskEntity.deleteOne({ _id: taskId });
                return msg400('Task is not created successfully');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async updateTask(taskId: string, task: any): Promise<IResponse> {
        try {
            if (await taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                const updateTask = await TaskEntity.updateOne({ _id: taskId }, task);

                return msg200({
                    message: (updateTask as any)
                });
            } else {
                return msg400('Task not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async deleteTask(taskId: string): Promise<IResponse> {
        try {
            if (await taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                const deleteTask = await TaskEntity.deleteOne({ _id: taskId });
                groupTaskServiceImpl.updateManyTasksInGroupTask(taskId);

                return msg200({
                    message: (deleteTask as any)
                });
            } else {
                return msg400('Task not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async getTask(taskId: string): Promise<IResponse> {
        const task = await TaskEntity.findOne({ _id: taskId });
        return msg200({
            task
        });
    }

    async getSubTasksInTask(taskId: string): Promise<IResponse> {
        const getSubTasks = await TaskEntity.findOne({ _id: taskId }).populate('subTasks');
        return msg200({
            message: (getSubTasks as any)
        });
    }

    async getCommentsInTask(taskId: string): Promise<IResponse> {
        const getComments = await TaskEntity.findOne({ _id: taskId }).populate('comments');
        return msg200({
            message: (getComments as any)
        });
    }

    // This fucntion is for boss only
    async getAllTasks(): Promise<IResponse> {
        const tasks = await TaskEntity.find();
        return msg200({
            tasks
        });
    }

    async updateManyCommentsInTask(commentId: string): Promise<IResponse> {
        const updateManyTasks = await TaskEntity.updateMany({ comments: commentId }, { $pull: { comments: commentId } });

        return msg200({
            message: (updateManyTasks as any)
        });
    }

    async updateManySubTasksInTask(subTaskId: string): Promise<IResponse> {
        const updateManyTasks = await TaskEntity.updateMany({ subTasks: subTaskId }, { $pull: { subTasks: subTaskId } });

        return msg200({
            message: (updateManyTasks as any)
        });
    }

    // disable task

    // enable task

    // add subTask
}

export const taskService = new TaskService();