import { NextFunction, Request, Response, Router } from "express";
import { RequestValidator } from "../../core/common/error-handler";
import { GroupTaskRequestDto } from "../../core/domain/dtos/group-task.dto";
import { updateNameRequestDto } from "../../core/domain/dtos/request_dtos/update-name-request.dto";
import { groupTaskController } from "../controllers/group-task.controller";
import { returnResult } from "../../kernel/util/return-result";
import { ARCHIEVE_GROUP_TASK_FAILED, CREATE_GROUP_TASK_FAILED, DELETE_GROUP_TASK_FAILED, ENABLE_GROUP_TASK_FAILED, GROUP_TASK_NOT_FOUND, TASK_NO_RECORDS, UPDATE_GROUP_TASK_FAILED } from "../../core/domain/constants/error.constant";

export const groupTaskRouter = Router();

const groupTaskControllerImpl = groupTaskController;

// get one group task
groupTaskRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.getGrouptaskById(req, next);
        returnResult(groupTaskResult, GROUP_TASK_NOT_FOUND, res, next);
    }
    catch (err) {
        next(err);
    }
});

// create group task
groupTaskRouter.post("/create",
    RequestValidator.validate(GroupTaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.createGroupTask(req, next);
        returnResult(groupTaskResult, CREATE_GROUP_TASK_FAILED, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update group task
groupTaskRouter.put("/:id", 
    RequestValidator.validate(GroupTaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.updateGroupTask(req, next);
        returnResult(groupTaskResult, UPDATE_GROUP_TASK_FAILED, res, next);
    }
    catch (err) {
        next(err);
    }
});

// delete group task
groupTaskRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.deleteGroupTask(req, next);
        returnResult(groupTaskResult, DELETE_GROUP_TASK_FAILED, res, next);
    }
    catch (err) {
        next(err);
    }
});

// get all tasks of a group task
groupTaskRouter.get("/:id/tasks", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.getTasksByGroupTaskId(req, next);
        returnResult(groupTaskResult, GROUP_TASK_NOT_FOUND, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update group task name
groupTaskRouter.put("/:id/update-name", 
    RequestValidator.validate(updateNameRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.updateGroupTaskName(req, next);
        returnResult(groupTaskResult, UPDATE_GROUP_TASK_FAILED, res, next);
    }
    catch (err) {
        next(err);
    }
});

// calculate total tasks and total tasks completed
groupTaskRouter.get("/:id/tasks-complete", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.calculateTotalTasks(req, next);
        returnResult(groupTaskResult, TASK_NO_RECORDS, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update ordinal number
groupTaskRouter.put("/:id/update-ordinal", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.updateOrdinalNumber(req, next);
        returnResult(groupTaskResult, UPDATE_GROUP_TASK_FAILED, res, next);
    }
    catch (err) {
        next(err);
    }
});

// archieve group task
groupTaskRouter.put("/:id/archieve", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.archieveGroupTask(req, next);
        returnResult(groupTaskResult, ARCHIEVE_GROUP_TASK_FAILED, res, next);
    }
    catch (err) {
        next(err);
    }
});

// enable group task
groupTaskRouter.put("/:id/enable", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskControllerImpl.enableGroupTask(req, next);
        returnResult(groupTaskResult, ENABLE_GROUP_TASK_FAILED, res, next);
    }
    catch (err) {
        next(err);
    }
});
