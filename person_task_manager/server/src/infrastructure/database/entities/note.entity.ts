import mongoose, { Schema } from "mongoose";
import { ActiveStatus } from "../../../core/domain/enums/enums";
import { IUserTagEntity } from "./user-tag.entity";

export interface INoteEntity extends Document {
    _id: string;
    name: string;
    fileLocation: string;
    tag: IUserTagEntity;
    activeStatus: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}

export const noteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        fileLocation: {
            type: String,
            required: false,
        },
        tag: {
            type: Schema.Types.ObjectId,
            ref: 'UserTag',
            required: false,
        },
        activeStatus: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
);

noteSchema.virtual("id").get(function () {
    return this._id.toString();
});

export const NoteEntity = mongoose.model<INoteEntity>("Note", noteSchema);