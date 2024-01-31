import { NextFunction, Request } from "express";
import { IResponse } from "../../core/common/response";
import { subTaskService } from "../../core/services/sub-task.service";
import { plainToInstance } from "class-transformer";
import { SubTaskRequestDto } from "../../core/domain/dtos/sub-task.dto";

class SubTaskController {
    constructor() {}

    async getSubTaskById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const subTaskId = req.params.id;
            const subTaskResult = await subTaskService.getSubTask(subTaskId);

            return subTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async createSubTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;

            const createSubTaskObjectDto = plainToInstance(SubTaskRequestDto, bodyJson);   
            const taskId = bodyJson.taskId;
            const subTaskResult = await subTaskService.createSubTask(createSubTaskObjectDto, taskId);

            return subTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async updateSubTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;

            const subTaskId = req.params.id;
            const updateSubTaskObjectDto = plainToInstance(SubTaskRequestDto, bodyJson);
            const subTaskResult = await subTaskService.updateSubTask(updateSubTaskObjectDto, subTaskId);

            return subTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async deleteSubTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const subTaskId = req.params.id;
            const subTaskResult = await subTaskService.deleteSubTask(subTaskId);

            return subTaskResult;
        } catch (err) {
            next(err);
        }
    }
}

export const subTaskController = new SubTaskController();