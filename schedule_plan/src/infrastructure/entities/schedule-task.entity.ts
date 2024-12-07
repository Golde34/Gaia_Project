import mongoose from "mongoose";

export interface IScheduleTaskEntity extends Document {
    _id: string;
    taskId: string;
    title: string;
    priority: Number;
    status: string;
    startDate: Date;
    deadline: Date;
    duration: Number;
    activeStatus: string;
    preferenceLevel: Number;
    isSynchronizedWithWO: boolean;
    taskOrder: Number;
    weight: Number;
    stopTime: Number;
    taskBatch: Number;
    schedulePlanId: Number;
}

export const scheduleTaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        priority: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        activeStatus: {
            type: String,
            required: true,
        },
        preferenceLevel: {
            type: Number,
            required: true,
        },
        taskId: {
            type: String,
            required: true,
        },
        isSynchronizedWithWO: {
            type: Boolean,
            required: false,        
        },
        taskOrder: {
            type: Number,
            required: false,
        },
        weight: {
            type: Number,
            required: false,
        },
        stopTime: {
            type: Number,
            required: false,
        },
        taskBatch: {
            type: Number,
            required: false,
        },
        schedulePlanId: {
            type: Number,
            required: true,
        }
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        required: true,
    },
);

scheduleTaskSchema.virtual("id").get(function(this: IScheduleTaskEntity) {
    return this._id.toString();
});

export const ScheduleTaskEntity = mongoose.model<IScheduleTaskEntity>("ScheduleTask", scheduleTaskSchema);
