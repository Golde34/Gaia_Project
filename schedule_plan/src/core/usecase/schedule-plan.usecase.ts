import { ActiveStatus } from "../domain/enums/enums";
import { schedulePlanService } from "../services/schedule-plan.service";

class SchedulePlanUsercase {
    constructor() {}

    async registerSchedulePlan(userId: number): Promise<void> {
        try {
            const schedulePlan = {
                userId: userId,
                startDate: new Date(),
                activeStatus: ActiveStatus.active,
            }
            const result = await schedulePlanService.createSchedulePlan(schedulePlan);
            console.log('Result: ', result);
        } catch (error) {
            console.error("Error on create Schedule plan: ", error);
        }
    }
}

export const schedulePlanUsecase = new SchedulePlanUsercase;