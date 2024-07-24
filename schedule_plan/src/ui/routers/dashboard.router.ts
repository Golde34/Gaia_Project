import { NextFunction, Request, Response, Router } from "express";
import { scheduleController } from "../controllers/schedule.controller";
import { returnResult } from "../../kernel/utils/return-result";
import { SCHEDULE_PLAN_SERVICE_ERROR } from "../../core/domain/constants/error.constants";

export const dashboardRouter = Router();

const scheduleControllerImpl = scheduleController;

dashboardRouter.get("/check-existed-schedules", 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await scheduleControllerImpl.checkExistedSchedules(req, next);
            returnResult(result, SCHEDULE_PLAN_SERVICE_ERROR, res, next);
        } catch (error) {
            next(error);
        }
    }
)