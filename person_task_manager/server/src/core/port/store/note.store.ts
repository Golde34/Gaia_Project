import { noteRepository } from "../../../infrastructure/database/repository/note.repository";
import { INoteEntity } from "../../domain/entities/note.entity";

class NoteStore {
    constructor() { }

    async getAllNotes(userId: number): Promise<INoteEntity[]> {
        return await noteRepository.getAllNotesByUserId(userId);
    }

    async createNote(note: any): Promise<INoteEntity> {
        return await noteRepository.createNote(note);
    }

    async updateNoteById(noteId: string, note: any): Promise<any> {
        return await noteRepository.updateNoteById(noteId, note);
    }

    async deleteNoteById(noteId: string): Promise<any> {
        return await noteRepository.deleteNoteById(noteId);
    }

    async getNoteById(noteId: string): Promise<INoteEntity | null> {
        return await noteRepository.findOneNoteById(noteId);
    }

    async archiveNoteById(noteId: string): Promise<any> {
        return await noteRepository.archiveNoteById(noteId);
    }

    async unarchiveNoteById(noteId: string): Promise<any> {
        return await noteRepository.unarchiveNoteById(noteId);
    }
}

export const noteStore = new NoteStore();