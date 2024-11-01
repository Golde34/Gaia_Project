import CacheSingleton from "../../infrastructure/internal-cache/cache-singleton";
import { createMessage } from "../../infrastructure/kafka/create-message";
import { KafkaConfig } from "../../infrastructure/kafka/kafka-config";
import { InternalCacheConstants } from "../domain/constants/constants";
import { INoteEntity } from "../domain/entities/note.entity";
import { EventStatus } from "../domain/enums/enums";
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
            notes.forEach(note => {
                if (note.isLock) {
                    note.summaryDisplayText = "This note is locked";
                }
            })
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

    async pushKafkaUploadFileToDataStorage(noteId: string, fileId: string, fileName: string): Promise<void> {
        const data = noteMapper.buildUploadFileKafkaMessage(noteId, fileId, fileName);
        const messages = [{
            value: JSON.stringify(createMessage(
                KafkaCommand.UPLOAD_FILE, '00', 'Successful', data
            ))
        }]
        console.log("Push Kafka message: ", messages);
        this.kafkaConfig.produce(KafkaTopic.UPLOAD_FILE, messages);
    }

    async updateNoteFileStatus(note: INoteEntity, fileLocation: string): Promise<INoteEntity> {
        note.fileLocation = fileLocation;
        note.fileStatus = EventStatus.SUCCESS;
        this.noteCache.clear(InternalCacheConstants.NOTE_LIST + note.ownerId);
        return await noteStore.updateNoteById(note._id, note);
    }

    async updateNote(note: INoteEntity): Promise<INoteEntity> {
        this.noteCache.clear(InternalCacheConstants.NOTE_LIST + note.ownerId);
        this.noteCache.clear(InternalCacheConstants.NOTE_DETAIL + note._id);
        return await noteStore.updateNoteById(note._id, note);
    }

    async lockNote(note: INoteEntity, notePassword: string, passwordSuggestion: string): Promise<INoteEntity> {
        const lockedNote = noteMapper.lockNoteMapper(note, notePassword, passwordSuggestion);
        this.noteCache.clear(InternalCacheConstants.NOTE_LIST + lockedNote.ownerId);
        return await noteStore.updateNoteById(lockedNote._id, lockedNote);
    }

    async unlockNote(note: INoteEntity): Promise<INoteEntity> {
        const unlockedNote = noteMapper.unlockNoteMapper(note);
        this.noteCache.clear(InternalCacheConstants.NOTE_LIST + unlockedNote.ownerId);
        return await noteStore.updateNoteById(unlockedNote._id, unlockedNote);
    }

    async deleteNoteById(note: INoteEntity, noteId: string): Promise<any> {
        this.noteCache.clear(InternalCacheConstants.NOTE_LIST + note.ownerId);
        return await noteStore.deleteNoteById(noteId);
    }

    async getNoteById(noteId: string): Promise<INoteEntity | null> {
        const notesCache = this.noteCache.get(InternalCacheConstants.NOTE_LIST + noteId);
        if (notesCache) {
            console.log("Get note from cache");
            return notesCache;
        } else {
            console.log("Get note from database");
            const note = await noteStore.getNoteById(noteId);
            this.noteCache.set(InternalCacheConstants.NOTE_LIST + noteId, note);
            return note;
        }
    }

    async getNoteByIdAndPassword(note: any): Promise<INoteEntity | null> {
        console.log("Get note by id and password: ", note);
        return await noteStore.getNoteByIdAndPassword(note.noteId, note.notePassword);
    }

    async archiveNoteById(noteId: string): Promise<any> {
        return await noteStore.archiveNoteById(noteId);
    }

    async enableNoteById(noteId: string): Promise<any> {
        return await noteStore.unarchiveNoteById(noteId);
    }
}

export const noteService = new NoteService();