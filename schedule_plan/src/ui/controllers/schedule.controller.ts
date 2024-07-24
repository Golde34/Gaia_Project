import { NextFunction, Request } from "express";
import { IResponse, msg200 } from "../../core/common/response";
import { schedulePlanService } from "../../core/services/schedule-plan.service";

class ScheduleController {
    constructor() {}

    async checkExistedSchedules(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = req.body.userId;
            return await schedulePlanService.findSchedulePlanByUserId(userId);
        } catch (error) {
            next(error);
        }
    }
}

export const scheduleController = new ScheduleController();