import mongoose, { Schema } from "mongoose";
import { ISubTaskEntity } from "./sub-task.entity";
import { ICommentEntity } from "./comment.entity";
import { ActiveStatus } from "../../../core/domain/enums/enums";
import { IUserTagEntity } from "./user-tag.entity";

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
    updatedAt: Date;
    activeStatus: ActiveStatus;
    tag: IUserTagEntity 
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
            type: [Schema.Types.ObjectId],
            ref: 'SubTask',
            required: false,
        },
        comments: {
            type: [Schema.Types.ObjectId],
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
        activeStatus: {
            type: String,
            enum: Object.values(ActiveStatus),
            default: ActiveStatus.active,
        },
        tag: {
            type: [Schema.Types.ObjectId],
            ref: 'Tag',
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