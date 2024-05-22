import mongoose, { Schema } from "mongoose";
import { ITaskEntity } from "./task.entity";
import { ActiveStatus } from "../../core/domain/enums/enums";
import { TaskTag } from "../../core/domain/dtos/request_dtos/tag.dto";
import { IUserTagEntity } from "./user-tag.entity";

export interface IGroupTaskEntity extends Document {
    _id: string;
    title: string;
    description: string;
    priority: string[];
    status: string;
    tasks: ITaskEntity["_id"][];
    totalTasks: number;
    completedTasks: number;
    ordinalNumber: number;
    createdAt: Date;
    updatedAt: Date;
    activeStatus: ActiveStatus;
    tag: IUserTagEntity
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
        completedTasks: {
            type: Number,
            required: false,
        },
        ordinalNumber: {
            type: Number,
            required: false,
        },
        createdAt: {
            type: Date,
            required: false,
        },
        updatedAt: {
            type: Date,
            required: false,
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

groupTaskSchema.virtual("id").get(function () {
    return this._id.toString();
});



export const GroupTaskEntity = mongoose.model<IGroupTaskEntity>("GroupTask", groupTaskSchema);