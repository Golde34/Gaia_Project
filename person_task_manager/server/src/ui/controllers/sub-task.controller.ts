import { NextFunction, Request, Response, Router } from "express";
import { subTaskService } from "../../core/services/sub-task.service";
import { sendResponse } from "../../core/common/response_helpers";
import { RequestValidator } from "../../core/common/error-handler";
import { SubTaskRequestDto } from "../../core/domain/dtos/sub-task.dto";
import { plainToInstance } from "class-transformer";

export const subTaskRouter = Router();

// get one sub task
subTaskRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskId = req.params.id;
        const subTaskResult = await subTaskService.getSubTask(subTaskId);

        sendResponse(subTaskResult, res, next);
    } catch (err) {
        next(err);
    }
});

// create sub task
subTaskRouter.post("/create", 
    RequestValidator.validate(SubTaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const createSubTaskObjectDto = plainToInstance(SubTaskRequestDto, bodyJson);   
        const taskId = bodyJson.taskId;
        const subTaskResult = await subTaskService.createSubTask(createSubTaskObjectDto, taskId);

        sendResponse(subTaskResult, res, next);
    } catch (err) {
        next(err);
    }
});

// update sub task
subTaskRouter.put("/:id", 
    RequestValidator.validate(SubTaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const subTaskId = req.params.id;
        const updateSubTaskObjectDto = plainToInstance(SubTaskRequestDto, bodyJson);
        const subTaskResult = await subTaskService.updateSubTask(updateSubTaskObjectDto, subTaskId);

        sendResponse(subTaskResult, res, next);
    } catch (err) {
        next(err);
    }
});

// delete sub task
subTaskRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskId = req.params.id;
        const subTaskResult = await subTaskService.deleteSubTask(subTaskId);

        sendResponse(subTaskResult, res, next);
    } catch (err) {
        next(err);
    }
});