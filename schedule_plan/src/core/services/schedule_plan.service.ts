import { schedulePlanRepository } from "../../infrastructure/repository/schedule_plan.repository";
import { IResponse, msg200, msg400, msg500 } from "../common/response";

class SchedulePlanService {
    constructor() {}

    async createSchedulePlan(schedulePlan: any): Promise<IResponse> {
        try {
            const createSchedulePlan = await schedulePlanRepository.createSchedulePlan(schedulePlan);
            return msg200({
                message: (createSchedulePlan as any)
            });
        } catch (error: any) {
            return msg500(error.message.toString());
        }
    }

    async updateSchedulePlan(schedulePlanId: string, schedulePlan: any): Promise<IResponse> {
        try {
            const updateSchedulePlan = await schedulePlanRepository.updateSchedulePlan(schedulePlanId, schedulePlan);
            return msg200({
                message: (updateSchedulePlan as any)
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async deleteSchedulePlan(schedulePlanId: string): Promise<IResponse> {
        try {
            const deleteSchedulePlan = await schedulePlanRepository.deleteSchedulePlan(schedulePlanId);
            return msg200({
                message: (deleteSchedulePlan as any)
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async findSchedulePlanById(schedulePlanId: string): Promise<IResponse> {
        try {
            const schedulePlan = await schedulePlanRepository.findSchedulePlanById(schedulePlanId);
            return msg200({
                schedulePlan: schedulePlan
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }
}

export const schedulePlanService = new SchedulePlanService();