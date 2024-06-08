import mongoose from "mongoose";

export interface IReportEntity extends Document {
    _id: string;
    userId: number;
    title: string;
    description: string;
    numberTaskDone: number;
    numberTaskOverdue: number;
    numberTaskNotDone: number;
}

export const reportSchema = new mongoose.Schema(
    {
        userId: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        numberTaskDone: {
            type: Number,
            required: true,
        },
        numberTaskOverdue: {
            type: Number,
            required: true,
        },
        numberTaskNotDone: {
            type: Number,
            required: true,
        },
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        required: true,
    },
);

reportSchema.virtual("id").get(function(this: IReportEntity) {
    return this._id.toString();
});

export const ReportEntity = mongoose.model<IReportEntity>("Report", reportSchema);