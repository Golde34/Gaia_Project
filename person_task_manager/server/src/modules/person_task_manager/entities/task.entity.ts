import mongoose from "mongoose";

export interface ITaskEntity extends Document {
    _id: string;
    title: string;
    description: string;
    priority: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
    subTasks: string[];
}

export const taskSchema = new mongoose.Schema<ITaskEntity>(
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
        subTasks: {
            type: [String],
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