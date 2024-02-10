import { Request, NextFunction } from "express";
import { IResponse } from "../../core/common/response";
import { taskService } from "../../core/services/task.service";
import { plainToInstance } from "class-transformer";
import { TaskRequestDto, UpdateTaskInDialogDTO } from "../../core/domain/dtos/task.dto";
import { groupTaskService } from "../../core/services/group-task.service";
import { EXCEPTION_PREFIX, GROUP_TASK_EXCEPTION, GROUP_TASK_NOT_FOUND, PROJECT_NOT_FOUND } from "../../core/domain/constants/error.constant";

class TaskController {
    constructor() {}

    async getAllTasks(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const taskResult = await taskService.getAllTasks();

            return taskResult;
        } catch (err) {
            next(err);
        }
    }

    async getTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const taskId = req.params.id;
            const taskResult = await taskService.getTask(taskId);

            return taskResult;
        } catch (err) {
            next(err);
        }
    }

    async createTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body;

            const createTaskObjectDto = plainToInstance(TaskRequestDto, bodyJson);
            const groupTaskId = bodyJson.groupTaskId;
            const taskResult = await taskService.createTaskInGroupTask(createTaskObjectDto, groupTaskId);

            return taskResult;
        } catch (err) {
            next(err);
        }
    }

    async updateTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body;
            const taskId = req.params.id;

            const updateTaskObjectDto = plainToInstance(TaskRequestDto, bodyJson);
            const taskResult = await taskService.updateTask(taskId, updateTaskObjectDto);

            return taskResult;
        } catch (err) {
            next(err);
        }
    }

    async deleteTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const taskId = req.params.id;
            const groupTaskFindByTaskId = await groupTaskService.getGroupTaskByTaskId(taskId);
            if (groupTaskFindByTaskId === EXCEPTION_PREFIX+GROUP_TASK_EXCEPTION || groupTaskFindByTaskId === GROUP_TASK_NOT_FOUND) {
                next(new Error(GROUP_TASK_NOT_FOUND));
            }
            const taskResult = await taskService.deleteTask(taskId, groupTaskFindByTaskId);

            return taskResult;
        } catch (err) {
            next(err);
        }
    }

    async getSubTasksByTaskId(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const taskId = req.params.id;
            const subTaskResult = await taskService.getSubTasksInTask(taskId);

            return subTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async getCommentsByTaskId(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const taskId = req.params.id;
            const commentResult = await taskService.getCommentsInTask(taskId);

            return commentResult;
        } catch (err) {
            next(err);
        }
    }

    async generateTaskWithoutGroupTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;
            const projectId = bodyJson.projectId;
            const task = plainToInstance(TaskRequestDto, bodyJson)
            
            // generate new group task contains created task
            let groupTask = {
                title: task.title,
                description: task.description,
                status: task.status,
                ordinalNumber: 1,
            }

            let groupTaskCreated;
            if (projectId) {
                groupTaskCreated = await groupTaskService.createGroupTaskFromTask(groupTask, projectId);
            } else {
                next(new Error(PROJECT_NOT_FOUND));
            }
            
            if (groupTaskCreated !== undefined) {
                const taskResult = await taskService.createTaskInGroupTask(task, groupTaskCreated);
                return taskResult;
            }
            return undefined;
        } catch (err) {
            next(err);
        }
    }

    async updateTaskInDialog(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;
            const taskId = req.params.id;
            const task = plainToInstance(UpdateTaskInDialogDTO, bodyJson);

            const taskResult = await taskService.updateTaskInDialog(taskId, task);
            return taskResult;
        } catch (err) {
            next(err);
        }
    }

    async moveTaskToAnotherGroupTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;
            const taskId = req.params.id;
            const oldGroupTaskId = bodyJson.oldGroupTaskId;
            const newGroupTaskId = bodyJson.newGroupTaskId;

            const stringResult = await taskService.moveTask(taskId, oldGroupTaskId, newGroupTaskId);
            return stringResult;
        } catch (err) {
            next(err);
        }
    }

    async archieveTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const taskId = req.params.id;
            const taskResult = await taskService.archieveTask(taskId);

            return taskResult;
        } catch (err) {
            next(err);
        }
    }

    async enableTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const taskId = req.params.id;
            const taskResult = await taskService.enableTask(taskId);

            return taskResult;
        } catch (err) {
            next(err);
        }
    }
}

export const taskController = new TaskController();