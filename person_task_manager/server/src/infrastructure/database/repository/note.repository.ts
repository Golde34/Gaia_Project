import { UpdateWriteOpResult } from "mongoose";
import { INoteEntity } from "../../../core/domain/entities/note.entity";
import { NoteEntity } from "../model-repository/note.model";
import { DeleteResult } from "mongodb";
import { ActiveStatus } from "../../../core/domain/enums/enums";

class NoteRpository {
    constructor() { }

    async getAllNotesByUserId(userId: number): Promise<INoteEntity[]> {
        return await NoteEntity.find({ ownerId: userId, activeStatus: ActiveStatus.active});
    }

    async createNote(note: any): Promise<INoteEntity> {
        return await NoteEntity.create(note);
    }

    async updateNoteById(noteId: string, note: any): Promise<UpdateWriteOpResult> {
        return await NoteEntity.updateOne({ _id: noteId }, note);
    }

    async deleteNoteById(noteId: string): Promise<DeleteResult> {
        return await NoteEntity.deleteOne({ _id: noteId });
    }

    async findOneNoteById(noteId: string): Promise<INoteEntity | null> {
        return await NoteEntity.findOne({ _id: noteId, activeStatus: ActiveStatus.active });
    }

    async archiveNoteById(noteId: string): Promise<UpdateWriteOpResult> {
        return await NoteEntity.updateOne({ _id: noteId }, { activeStatus: ActiveStatus.inactive });
    }

    async unarchiveNoteById(noteId: string): Promise<UpdateWriteOpResult> {
        return await NoteEntity.updateOne({ _id: noteId }, { activeStatus: ActiveStatus.active });
    }
}

export const noteRepository = new NoteRpository();