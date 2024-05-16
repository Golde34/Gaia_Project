import mongoose, { Schema } from "mongoose";
import { IGroupTaskEntity } from "./group-task.entity";
import { ActiveStatus } from "../enums/enums";
import { TaskTag } from "../dtos/request_dtos/tag.dto";

export interface IProjectEntity extends Document {
    _id: string;
    name: string;
    description: string;
    status: string;
    color: string;
    groupTasks: IGroupTaskEntity["_id"][];
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
    activeStatus: ActiveStatus;
    tag: TaskTag;
}

export const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: false,
        },
        groupTasks: {
            type: [Schema.Types.ObjectId],
            ref: 'GroupTask',
            required: false,
        },
        ownerId: {
            type: Number,
            required: true,
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
            required: true,
        },
        tag: {
            type: Object,
            require: true,
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

projectSchema.virtual("id").get(function () {
    return this._id.toString();
});

export const ProjectEntity = mongoose.model<IProjectEntity>("Project", projectSchema);