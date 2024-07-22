import { NextFunction, Request, Response, Router } from "express";
import { scheduleController } from "../controllers/schedule.controller";
import { returnResult } from "../../kernel/utils/return-result";

export const dashboardRouter = Router();

const scheduleControllerImpl = scheduleController;

dashboardRouter.get("/check-existed-schedules", 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await scheduleControllerImpl.checkExistedSchedules(req, next);
            returnResult(result, "FAIL", res, next);
        } catch (error) {
            next(error);
        }
    }
)