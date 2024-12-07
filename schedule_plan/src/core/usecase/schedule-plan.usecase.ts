import { IResponse, msg200, msg400 } from "../common/response";
import { ActiveStatus } from "../domain/enums/enums";
import { schedulePlanService } from "../services/schedule-plan.service";

class SchedulePlanUsercase {
    constructor() {}

    async registerSchedulePlan(userId: number): Promise<IResponse> {
        var isScheduleExist = false;
        try {
            const schedulePlan = {
                userId: userId,
                startDate: new Date(),
                activeStatus: ActiveStatus.active,
                activeTaskBatch: 0,
                isTashBatchActive: false
            }
            const result = await schedulePlanService.createSchedulePlan(schedulePlan);
            console.log('Result: ', result);
            isScheduleExist = true;
            return msg200({
                isScheduleExist
            }); 
        } catch (error) {
            console.error("Error on create Schedule plan: ", error);
            return msg200({
                isScheduleExist
            });
        }
    }
}

export const schedulePlanUsecase = new SchedulePlanUsercase;