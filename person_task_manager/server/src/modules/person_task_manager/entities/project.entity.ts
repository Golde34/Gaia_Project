import mongoose, { Schema } from "mongoose";
import { IGroupTaskEntity } from "./group-task.entity";

export interface IProjectEntity extends Document {
    _id: string;
    name: string;
    description: string;
    status: string;
    groupTasks: IGroupTaskEntity["_id"][];
    ownerId: number;
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
        groupTasks: {
            type: [Schema.Types.ObjectId],
            ref: 'GroupTask',
            required: false,
        },
        ownerId: {
            type: Number,
            required: true,
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