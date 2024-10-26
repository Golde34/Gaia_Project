import mongoose, { Schema } from "mongoose";
import { INoteEntity } from "../../../core/domain/entities/note.entity";
import { ActiveStatus } from "../../../core/domain/enums/enums";

export const noteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        summaryDisplayText: {
            type: String,
            require: false,
        },
        fileId: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileLocation: {
            type: String,
            required: false,
        },
        fileStatus: {
            type: String,
            required: true,
        },
        isLock: {
            type: Boolean,
            required: false,
            default: false,
        },
        tag: {
            type: Schema.Types.ObjectId,
            ref: 'UserTag',
            required: false,
        },
        activeStatus: {
            type: String,
            enum: Object.values(ActiveStatus),
            default: ActiveStatus.active,
        },
        notePassword: {
            type: String,
            required: false,
        },
        passwordSuggestion: {
            type: String,
            required: false,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: false,
        },
        ownerId: {
            type: Number,
            required: true,
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