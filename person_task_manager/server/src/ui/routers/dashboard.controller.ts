import { NextFunction, Request, Response, Router } from "express";
import { taskService } from "../../core/services/task.service";
import { sendResponse } from "../../core/common/response_helpers";

export const dashboardRouter = Router();

// get 3 top tasks
dashboardRouter.get("/top-tasks",
    // checkToken,
    // checkPermission(Permission.readTask),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const taskResult = await taskService.getTopTasks(3);

            sendResponse(taskResult, res, next);
        }
        catch (err) {
            next(err);
        }
    });