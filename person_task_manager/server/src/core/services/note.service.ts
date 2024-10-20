import { KafkaConfig } from "../../infrastructure/kafka/kafka-config";
import { IResponse } from "../common/response";
import { msg200 } from "../common/response-helpers";
import { INoteEntity } from "../domain/entities/note.entity";
import { createNoteMapper } from "../port/mapper/note.mapper";
import { noteStore } from "../port/store/note.store";

class NoteService {
    constructor(
        public kafkaConfig = new KafkaConfig()
    ) { }

    async getAllNotes(userId: number): Promise<INoteEntity[]> {
        return await noteStore.getAllNotes(userId);
    }

    async createNote(note: any): Promise<INoteEntity> {
        const convertedNote: INoteEntity = createNoteMapper(note, note.userId);
        return await noteStore.createNote(convertedNote);
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