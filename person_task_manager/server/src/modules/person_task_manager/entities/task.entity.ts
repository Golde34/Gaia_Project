import mongoose from "mongoose";
import { ISubTaskEntity } from "./sub-task.entity";
import { ICommentEntity } from "./comment.entity";

export interface ITaskEntity extends Document {
    _id: string;
    title: string;
    description: string;
    priority: string[];
    status: string;
    startDate: Date;
    deadline: Date;
    duration: number;
    subTasks: ISubTaskEntity["_id"][];
    comments: ICommentEntity["_id"][];
    createdAt: Date;

}

export const taskSchema = new mongoose.Schema(
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
        startDate: {
            type: Date,
            required: false,
        },
        deadline: {
            type: Date,
            required: false,
        },
        duration: {
            type: Number,
            required: false,
        },
        subTasks: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'SubTask',
            required: false,
        },
        comments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Comment',
            required: false,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

taskSchema.virtual("id").get(function () {
    return this._id.toString();
});

export const TaskEntity = mongoose.model<ITaskEntity>("Task", taskSchema);