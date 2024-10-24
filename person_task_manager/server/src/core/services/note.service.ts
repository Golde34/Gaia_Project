import CacheSingleton from "../../infrastructure/internal-cache/cache-singleton";
import { createMessage } from "../../infrastructure/kafka/create-message";
import { KafkaConfig } from "../../infrastructure/kafka/kafka-config";
import { InternalCacheConstants } from "../domain/constants/constants";
import { INoteEntity } from "../domain/entities/note.entity";
import { KafkaCommand, KafkaTopic } from "../domain/enums/kafka.enums";
import { noteMapper } from "../port/mapper/note.mapper";
import { noteStore } from "../port/store/note.store";

class NoteService {
    constructor(
        public kafkaConfig = new KafkaConfig(),
        public noteCache = CacheSingleton.getInstance().getCache()
    ) { }

    async getAllNotes(userId: number): Promise<INoteEntity[]> {
        const notesCache = this.noteCache.get(InternalCacheConstants.NOTE_LIST + userId);
        if (notesCache) {
            console.log("Get notes from cache");
            return notesCache;
        } else {
            console.log("Get notes from database");
            const notes = await noteStore.getAllNotes(userId);
            this.noteCache.set(InternalCacheConstants.NOTE_LIST + userId, notes);
            return notes;
        }
    }

    async createNote(note: any): Promise<INoteEntity> {
        const convertedNote: INoteEntity = noteMapper.createNoteMapper(note);
        const createdNote = await noteStore.createNote(convertedNote);
        this.noteCache.clear(InternalCacheConstants.NOTE_LIST + createdNote.ownerId);
        return createdNote;
    }

    async pushKafkaUploadFileToDataStorage(fileId: string, fileName: string): Promise<void> {
        const data = noteMapper.buildUploadFileKafkaMessage(fileId, fileName);
        const messages = [{
            value: JSON.stringify(createMessage(
                KafkaCommand.UPLOAD_FILE, '00', 'Successful', data
            ))
        }]
        console.log("Push Kafka message: ", messages);
        this.kafkaConfig.produce(KafkaTopic.UPLOAD_FILE, messages);
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