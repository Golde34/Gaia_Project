import mongoose from "mongoose";

export interface ISubTaskEntity extends Document {
    _id: string;
    mission: string;
    deadline: Date;
    priority: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

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
