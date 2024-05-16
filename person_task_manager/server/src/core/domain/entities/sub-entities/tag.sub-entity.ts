import { Schema } from "mongoose";

export interface TaskTag {
    tagName: string;
    tagWeightValue: number;
}

export const tagSchema = new Schema({
    tagName: {
        type: String,
        required: true,
    },
    tagWeigtValue: {
        type: Number,
        required: true,
    }
});