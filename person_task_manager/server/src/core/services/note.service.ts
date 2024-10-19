import { KafkaConfig } from "../../infrastructure/kafka/kafka-config";
import { IResponse } from "../common/response";
import { msg200 } from "../common/response-helpers";
import { INoteEntity } from "../domain/entities/note.entity";
import { noteStore } from "../port/store/note.store";

class NoteService {
    constructor(
        public kafkaConfig = new KafkaConfig()
    ) { }

    async getAllNotes(userId: number): Promise<IResponse> {
        const note = await noteStore.getAllNotes(userId);
        return msg200({
            message: (note as any)
        })
    }

    async createNote(note: any): Promise<INoteEntity> {
        return await noteStore.createNote(note);
    }

    async updateNote(note: INoteEntity): Promise<INoteEntity> {
        return await noteStore.updateNoteById(note._id, note);
    }

    async deleteNoteById(noteId: string): Promise<any> {
        return await noteStore.deleteNoteById(noteId);
    }

    async getNoteById(noteId: string): Promise<INoteEntity | null> {
        return await noteStore.getNoteById(noteId);
    }

    async archiveNoteById(noteId: string): Promise<any> {
        return await noteStore.archiveNoteById(noteId);
    }

    async enableNoteById(noteId: string): Promise<any> {
        return await noteStore.unarchiveNoteById(noteId);
    }
}

export const noteService = new NoteService();