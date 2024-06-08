import { UpdateWriteOpResult } from "mongoose";
import { ISchedulePlanEntity, SchedulePlanEntity } from "../entities/schedule_plan.entity";
import { DeleteResult } from "mongodb";
import { SchedulePlanStore } from "./store/schedule_plan.store";

class SchedulePlanRepository implements SchedulePlanStore {
    constructor() {}

    async createSchedulePlan(schedulePlan: any): Promise<ISchedulePlanEntity> {
        return await SchedulePlanEntity.create(schedulePlan);
    }

    async updateSchedulePlan(scheduleId: string, schedulePlan: any): Promise<UpdateWriteOpResult> {
        return await SchedulePlanEntity.updateOne({ _id: scheduleId }, schedulePlan);
    }

    async deleteSchedulePlan(scheduleId: string): Promise<DeleteResult> {
        return await SchedulePlanEntity.deleteOne({ _id: scheduleId });
    }

    async findSchedulePlanById(scheduleId: string): Promise<ISchedulePlanEntity | null> {
        return await SchedulePlanEntity.findOne({ _id: scheduleId });
    }
}

export const schedulePlanRepository = new SchedulePlanRepository();