import mongoose from "mongoose";

export interface ICommentEntity extends Document {
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
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