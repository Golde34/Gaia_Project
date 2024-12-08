import { Router } from "express";
import { returnResult } from "../../kernel/utils/return-result";
import { scheduleController } from "../controllers/schedule.controller";

export const scheduleTaskRouter = Router();

const scheduleTaskControllerImpl = scheduleController;

scheduleTaskRouter.get("/get-schedule-task-list/:id",
    async (req, res, next) => {
        try {
            const scheduleTaskResult = await scheduleTaskControllerImpl.getScheduleTaskList(req, next);
            return returnResult(scheduleTaskResult, "FAIL", res, next);
        } catch (error) {
            next(error);
        }
    }
);