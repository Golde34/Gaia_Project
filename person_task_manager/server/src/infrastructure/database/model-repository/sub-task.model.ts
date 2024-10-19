import mongoose from "mongoose";
import { ActiveStatus } from "../../../core/domain/enums/enums";
import { ISubTaskEntity } from "../../../core/domain/entities/sub-task.entity";

export const subTaskSchema = new mongoose.Schema(
    {
        mission: {
            type: String,
            required: true,
        },
        deadline: {
            type: Date,
            required: true,
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
        activeStatus: {
            type: String,
            enum: Object.values(ActiveStatus),
            default: ActiveStatus.active,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

subTaskSchema.virtual("id").get(function () {
    return this._id.toString();
});

export const SubTaskEntity = mongoose.model<ISubTaskEntity>("SubTask", subTaskSchema);
