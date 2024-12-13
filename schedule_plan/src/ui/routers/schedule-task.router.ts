import { Router, type Request, Response, NextFunction } from "express";
import { returnResult } from "../../kernel/utils/return-result";
import { scheduleController } from "../controllers/schedule.controller";

export const scheduleTaskRouter = Router();

const scheduleTaskControllerImpl = scheduleController;

scheduleTaskRouter.get("/get-schedule-task-list/:userId",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const scheduleTaskResult = await scheduleTaskControllerImpl.getScheduleTaskList(req, next);
            return returnResult(scheduleTaskResult, "FAIL", res, next);
        } catch (error) {
            next(error);
        }
    }
);

scheduleTaskRouter.get("/get-schedule-batch-task/:userId", 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const scheduleTaskResult = await scheduleTaskControllerImpl.getScheduleBatchTask(req, next);
            return returnResult(scheduleTaskResult, "FAIL", res, next);
        } catch (error) {
            next(error);
        }
    }
)

scheduleTaskRouter.post("/choose-schedule-batch-task", 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const scheduleTaskResult = await scheduleTaskControllerImpl.chooseScheduleBatchTask(req, next);
            return returnResult(scheduleTaskResult, "FAIL", res, next);
        } catch (error) {
            next(error);
        }
    }
)

scheduleTaskRouter.get("/get-schedule-task/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const sheduleTaskResult = await scheduleTaskControllerImpl.getScheduleTask(req, next);
            return returnResult(sheduleTaskResult, "FAIL", res, next);
        } catch (error) {
            next(error);
        }
    }
)