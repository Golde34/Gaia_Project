import mongoose from "mongoose";

export interface IUserEntity extends Document {
    id: number;
    username: string;
    email: string;
    maxWorkTime: number;
    sleepTime: number;
    relaxTime: number;
    eatTime: number;
    travelTime: number;
    sleepStart: number;
    sleepEnd: number;
}

export const userSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        maxWorkTime: {
            type: Number,
            required: true,
        },
        sleepTime: {
            type: Number,
            required: true,
        },
        relaxTime: {
            type: Number,
            required: true,
        },
        eatTime: {
            type: Number,
            required: true,
        },
        travelTime: {
            type: Number,
            required: true,
        },
        sleepStart: {
            type: Number,
            required: true,
        },
        sleepEnd: {
            type: Number,
            required: true,
        },
    }, 
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

export const User = mongoose.model<IUserEntity>("User", userSchema);