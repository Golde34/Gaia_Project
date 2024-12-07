import { NextFunction, Request } from "express";
import { IResponse, msg200 } from "../../core/common/response";
import { schedulePlanService } from "../../core/services/schedule-plan.service";
import { schedulePlanUsecase } from "../../core/usecase/schedule-plan.usecase";

class ScheduleController {
    constructor() {}

    async checkExistedSchedules(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = req.body.userId;
            return await schedulePlanService.returnSchedulePlanByUserId(userId);
        } catch (error) {
            next(error);
        }
    }

    async registerSchedulePlan(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const schedulePlan = req.body.userId;
            return await schedulePlanUsecase.registerSchedulePlan(schedulePlan);
        } catch (error) {
            next(error);
        }
    }
}

export const scheduleController = new ScheduleController();