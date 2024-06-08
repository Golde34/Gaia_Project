import mongoose from "mongoose";
import { ActiveStatus } from "../../core/domain/enums/enums";
import { IScheduleTaskEntity } from "./schedule_task.entity";

export interface ISchedulePlanEntity extends Document {
    _id: number;
    userId: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    activeStatus: ActiveStatus; 
    tasks: IScheduleTaskEntity["_id"][];
}

export const schedulePlanSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        activeStatus: {
            type: Object.values(ActiveStatus),
            default: ActiveStatus.active,
            required: true,
        },
        tasks: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "ScheduleTask",
            required: false,
        },
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        required: true,
    },
);

schedulePlanSchema.virtual("id").get(function(this: ISchedulePlanEntity) {
    return this._id.toString();
});

export const SchedulePlanEntity = mongoose.model<ISchedulePlanEntity>("SchedulePlan", schedulePlanSchema);