import mongoose from "mongoose";
import { ActiveStatus } from "../../core/domain/enums/enums";

export interface ICommentEntity extends Document {
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    activeStatus: ActiveStatus;
}

export const commentSchema = new mongoose.Schema(
    {
        content: {
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

commentSchema.virtual("id").get(function () {
    return this._id.toString();
});

export const CommentEntity = mongoose.model<ICommentEntity>("Comment", commentSchema);