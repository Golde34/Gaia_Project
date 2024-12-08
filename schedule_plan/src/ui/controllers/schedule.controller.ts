import { NextFunction, Request } from "express";
import { IResponse, msg200 } from "../../core/common/response";
import { schedulePlanService } from "../../core/services/schedule-plan.service";
import { schedulePlanUsecase } from "../../core/usecase/schedule-plan.usecase";
import { scheduleTaskUsecase } from "../../core/usecase/schedule-task.usecase";

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

    async getScheduleTaskList(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = parseInt(req.params.id, 10);
            const scheduleTaskList = await scheduleTaskUsecase.getListScheduleTaskByUserId(userId);
            return msg200({
                scheduleTaskList
            })
        } catch (error) {
            next(error);
        }
    }
}

export const scheduleController = new ScheduleController();