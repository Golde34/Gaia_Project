import { NextFunction, Request, Response, Router } from "express";
import { dashboardController } from "../controllers/dashboard.controller";
import { returnResult } from "../../kernel/util/return-result";
import { TASK_NO_RECORDS } from "../../core/domain/constants/error.constant";

export const dashboardRouter = Router();

const dashboardControllerImpl = dashboardController;

// get 3 top tasks
dashboardRouter.get("/top-tasks",
    // checkToken,
    // checkPermission(Permission.readTask),
    async (res: Request, req: Response, next: NextFunction): Promise<void> => {
        try {
            const dashboardResult = await dashboardControllerImpl.getTopTasks(res, next);
            returnResult(dashboardResult, TASK_NO_RECORDS, req, next);
        }
        catch (err) {
            next(err);
        }
    });