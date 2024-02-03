import { NextFunction, Request, Response, Router } from "express";
import { RequestValidator } from "../../core/common/error-handler";
import { SubTaskRequestDto } from "../../core/domain/dtos/sub-task.dto";
import { subTaskController } from "../controllers/sub-task.controller";
import { returnResult } from "../../kernel/util/return-result";
import { ARCHIEVE_SUB_TASK_FAILED, CREATE_SUB_TASK_FAILED, DELETE_SUB_TASK_FAILED, ENABLE_SUB_TASK_FAILED, SUB_TASK_NOT_FOUND, UPDATE_SUB_TASK_FAILED } from "../../core/domain/constants/error.constant";

export const subTaskRouter = Router();

const subTaskControllerImpl = subTaskController;

// get one sub task
subTaskRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskResult = await subTaskControllerImpl.getSubTaskById(req, next);
        returnResult(subTaskResult, SUB_TASK_NOT_FOUND, res, next);
    } catch (err) {
        next(err);
    }
});

// create sub task
subTaskRouter.post("/create", 
    RequestValidator.validate(SubTaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskResult = await subTaskControllerImpl.createSubTask(req, next);
        returnResult(subTaskResult, CREATE_SUB_TASK_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// update sub task
subTaskRouter.put("/:id", 
    RequestValidator.validate(SubTaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskResult = await subTaskControllerImpl.updateSubTask(req, next);
        returnResult(subTaskResult, UPDATE_SUB_TASK_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// delete sub task
subTaskRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskResult = await subTaskControllerImpl.deleteSubTask(req, next);
        returnResult(subTaskResult, DELETE_SUB_TASK_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// archieve sub task
subTaskRouter.put("/:id/archieve", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskResult = await subTaskControllerImpl.archieveSubTask(req, next);
        returnResult(subTaskResult, ARCHIEVE_SUB_TASK_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// enable sub task
subTaskRouter.put("/:id/enable", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskResult = await subTaskControllerImpl.enableSubTask(req, next);
        returnResult(subTaskResult, ENABLE_SUB_TASK_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});
