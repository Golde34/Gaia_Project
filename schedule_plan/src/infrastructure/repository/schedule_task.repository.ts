import { UpdateWriteOpResult } from "mongoose";
import { DeleteResult } from "mongodb";
import { IScheduleTaskEntity, ScheduleTaskEntity } from "../entities/schedule_task.entity";
import { ScheduleTaskStore } from "./store/shcedule_task.store";

class ScheduleTaskRepository implements ScheduleTaskStore {
    constructor() {}

    async createScheduleTask(scheduleTask: any): Promise<IScheduleTaskEntity> {
        return await ScheduleTaskEntity.create(scheduleTask);
    }
    
    async updateScheduleTask(scheduleTaskId: string, scheduleTask: any): Promise<UpdateWriteOpResult> {
        return await ScheduleTaskEntity.updateOne({ _id: scheduleTaskId }, scheduleTask);
    }

    async deleteScheduleTask(scheduleTaskId: string): Promise<DeleteResult> {
        return await ScheduleTaskEntity.deleteOne({ _id: scheduleTaskId });
    }

    async findScheduleTaskById(scheduleTaskId: string): Promise<IScheduleTaskEntity | null> {
        return await ScheduleTaskEntity.findById(scheduleTaskId);
    }
}

export const scheduleTaskRepository = new ScheduleTaskRepository();