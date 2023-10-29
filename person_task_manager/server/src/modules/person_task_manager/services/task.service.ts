import { TaskEntity } from "../entities/task.entity";
import { msg200, msg400 } from "../../../common/response_helpers";
import { IResponse } from "../../../common/response";
import { taskValidation } from "../validations/task.validation";
import { groupTaskService } from "./group-task.service";

const groupTaskServiceImpl = groupTaskService;
const taskValidationImpl = taskValidation;

class TaskService {
    constructor() {}

    async createTaskInGroupTask(task: any, groupTaskId: string): Promise<IResponse> {
        const createTask = await TaskEntity.create(task);
        const taskId = (createTask as any)._id;
        if (await !taskValidationImpl.checkExistedTaskInGroupTask(taskId, groupTaskId)) {
            groupTaskServiceImpl.updateGroupTask(groupTaskId, { $push: { tasks: taskId } });
        }

        return msg200({
            message: (createTask as any)
        });
    }

    async updateTask(taskId: string, task: any): Promise<IResponse> {
        try {
            if (await taskValidationImpl.checkExistedTaskByTaskId(taskId)) {
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
            if (await taskValidationImpl.checkExistedTaskByTaskId(taskId)) {
                const deleteTask = await TaskEntity.deleteOne({ _id: taskId });
                if (await taskValidationImpl.checkExistedTaskByTaskId(taskId)) {
                    groupTaskServiceImpl.updateManyGroupTasks({ data: { tasks: taskId } }, 
                        { $pull: { tasks: taskId } });
                }

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

    async updateManyTasks(filter: any, update: any): Promise<IResponse> {
        const updateManyTasks = await TaskEntity.updateMany({filter}, update);

        return msg200({
            message: (updateManyTasks as any)
        });
    }

    // disable task
    
    // enable task

    // add subTask
}   

export const taskService = new TaskService();