import mongoose, { Schema } from "mongoose";
import { ITaskEntity } from "./task.entity";

export interface IGroupTaskEntity {
    title: string;
    description: string;
    priority: string[];
    status: string;
    tasks: ITaskEntity["_id"][];
}

const groupTaskSchema = new Schema({
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
});

export const GroupTaskEntity = mongoose.model<IGroupTaskEntity>("GroupTask", groupTaskSchema);