import { TaskEntity } from "../entities/task.entity";
import { msg200, msg400 } from "../../../common/response_helpers";
import { IResponse } from "../../../common/response";
import { taskValidation } from "../validations/task.validation";
import { groupTaskService } from "./group-task.service";
import { UpdaetTaskInDialogDTO } from "../dtos/task.dto";
import { GroupTaskEntity } from "../entities/group-task.entity";
import { Priority } from "../../../loaders/enums";
import { projectService } from "./project.service";

const groupTaskServiceImpl = groupTaskService;
const taskValidationImpl = taskValidation;

class TaskService {
    constructor() { }

    async createTaskInGroupTask(task: any, groupTaskId: string | undefined): Promise<IResponse> {
        try {
            if (groupTaskId === undefined) return msg400('Group task not found');

            task.createdAt = new Date();
            task.updatedAt = new Date();
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

    async deleteTask(taskId: string, groupTaskId: string): Promise<IResponse> {
        try {
            if (await taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                const deleteTask = await TaskEntity.deleteOne({ _id: taskId });
                // delete task id in group task
                await GroupTaskEntity.updateOne({ _id: groupTaskId }, { $pull: { groupTasks: groupTaskId } });

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

    async updateTaskInDialog(taskId: string, task: UpdaetTaskInDialogDTO): Promise<IResponse> {
        try {
            if (await taskValidationImpl.checkExistedTaskByTaskId(taskId) === true) {
                const taskUpdate = await TaskEntity.findOne({ _id: taskId });

                if (taskUpdate === null) return msg400('Task not found');

                taskUpdate.title = task.title;
                taskUpdate.description = task.description ?? ''; // Use optional chaining operator and provide a default value
                taskUpdate.status = task.status;

                const updateTask = await TaskEntity.updateOne({ _id: taskId }, taskUpdate);

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

    // get top task 
    async getTopTasks(limit: number): Promise<IResponse> {
        try {
            const topTasks: any[] = [];
            const tasks = await TaskEntity.find()
                .where('priority').equals(Priority.star).limit(limit);

            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i];
                const groupTaskId = await groupTaskService.getGroupTaskByTaskId(task._id);
                const projectId = await projectService.getProjectByGroupTaskId(groupTaskId);

                topTasks.push({
                    task,
                    groupTaskId,
                    projectId
                });
            }

            console.log(topTasks);

            return msg200({
                topTasks
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }
    // async getAllTasks(): Promise<IResponse> {
    //     const tasks = await TaskEntity.find();
    //     return msg200({
    //         tasks
    //     });
    // }
    // disable task

    // enable task

    // archive task

    // add subTask
    
}

export const taskService = new TaskService();