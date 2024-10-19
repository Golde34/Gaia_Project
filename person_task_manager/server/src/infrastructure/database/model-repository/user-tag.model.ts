import mongoose from "mongoose";
import { ActiveStatus } from "../../../core/domain/enums/enums";
import { IUserTagEntity } from "../../../core/domain/entities/user-tag.entity";

export const userTagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        }, 
        ownerId: {
            type: Number,
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

userTagSchema.virtual("id").get(function () {
    return this._id.toString();
});

export const UserTagEntity = mongoose.model<IUserTagEntity>("UserTag", userTagSchema);