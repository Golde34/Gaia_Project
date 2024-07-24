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
