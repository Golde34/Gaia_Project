import { NextFunction, Request } from "express";
import { IResponse } from "../../core/common/response";
import { taskService } from "../../core/services/task.service";
import { projectService } from "../../core/services/project.service";

class DashboardController {

    constructor() {}

    async getTopTasks(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const NUMBER_OF_TOP_TASKS = 3;
            const taskResult = await taskService.getTopTasks(NUMBER_OF_TOP_TASKS);

            return taskResult;
        }
        catch (err) {
            next(err);
        }
    }

    async checkExistedTasks(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = req.body.userId;
            const taskResult = await projectService.checkExistedTasks(userId);

            return taskResult;
        }
        catch (err) {
            next(err);
        }
    }
    
}

export const dashboardController = new DashboardController();