import mongoose from "mongoose";
import { ISubTaskEntity } from "./sub-task.entity";
import { ICommentEntity } from "./comment.entity";

export interface ITaskEntity extends Document {
    _id: string;
    title: string;
    description: string;
    priority: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deadline: Date;
    subTasks: ISubTaskEntity["_id"][];
    comments: ICommentEntity ["_id"][];
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
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: true,
        },
        deadline: {
            type: Date,
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
        }
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