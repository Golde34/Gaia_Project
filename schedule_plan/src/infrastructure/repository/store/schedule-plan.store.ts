import { UpdateWriteOpResult } from "mongoose";
import { ISchedulePlanEntity } from "../../entities/schedule-plan.entity";
import { DeleteResult } from "mongodb";

export interface SchedulePlanStore {
    createSchedulePlan(schedulePlan: any): Promise<ISchedulePlanEntity>;
    updateSchedulePlan(schedulePlanId: string, schedulePlan: any): Promise<UpdateWriteOpResult>;
    deleteSchedulePlan(schedulePlanId: string): Promise<DeleteResult>;
    findSchedulePlanById(schedulePlanId: string): Promise<ISchedulePlanEntity | null>;
}
