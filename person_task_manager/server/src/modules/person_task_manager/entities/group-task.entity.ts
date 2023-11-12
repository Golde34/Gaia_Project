import mongoose, { Schema } from "mongoose";
import { ITaskEntity } from "./task.entity";

export interface IGroupTaskEntity extends Document{
    _id: string;
    title: string;
    description: string;
    priority: string[];
    status: string;
    tasks: ITaskEntity["_id"][];
    totalTasks: number;
    totalTasksCompleted: number;
}

export const groupTaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        priority: {
            type: [String],
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        tasks: {
            type: [Schema.Types.ObjectId],
            ref: 'Task',
            required: false,
        },
        totalTasks: {
            type: Number,
            required: false,
        },
        totalTasksCompleted: {
            type: Number,
            required: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

groupTaskSchema.virtual("id").get(function () {
    return this._id.toString();
});



export const GroupTaskEntity = mongoose.model<IGroupTaskEntity>("GroupTask", groupTaskSchema);