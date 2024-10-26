import { NextFunction, type Request } from "express";
import { IResponse } from "../../core/common/response";
import { plainToInstance } from "class-transformer";
import { NoteRequestDto } from "../../core/domain/dtos/note.dto";
import { noteService } from "../../core/services/note.service";
import { noteUsecase } from "../../core/usecases/note.usecase";

class NoteController {
    constructor() { }

    async getNotes(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = Number(req.params.userId);
            const notesResult = await noteUsecase.getAllNotes(userId);

            return notesResult;
        } catch (err) {
            next(err);
        }
    }

    async createNote(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body;
            const note = plainToInstance(NoteRequestDto, bodyJson);

            const noteResult = await noteUsecase.createNote(note);
            return noteResult;
        } catch (err) {
            next(err);
        }
    }

    async updateNote(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const noteName = req.body.name;
            const noteId = req.params.id;
            const noteResult = await noteUsecase.updateNoteById(noteId, noteName);
            return noteResult;
        } catch (err) {
            next(err);
        }
    }

    async deleteNote(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const noteId = req.params.id;
            const noteResult = await noteService.deleteNoteById(noteId);

            return noteResult;
        } catch (err) {
            next(err);
        }
    }

    async getNoteById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const noteId = req.params.id;
            const noteResult = await noteUsecase.getNoteById(noteId);

            return noteResult;
        } catch (err) {
            next(err);
        }
    }

    async lockNoteById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const body = req.body
            const noteResult = await noteUsecase.lockNoteById(body);

            return noteResult;
        } catch (err) {
            next(err);
        }
    }

    async unlockNoteById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const body = req.body
            const noteResult = await noteUsecase.unlockNoteById(body);

            return noteResult;
        } catch (err) {
            next(err);
        }
    }

    async archiveNoteById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const noteId = req.params.id;
            const noteResult = await noteService.archiveNoteById(noteId);

            return noteResult;
        } catch (err) {
            next(err);
        }
    }

    async enableNoteById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const noteId = req.params.id;
            const noteResult = await noteService.enableNoteById(noteId);

            return noteResult;
        } catch (err) {
            next(err);
        }
    }
}

export const noteController = new NoteController();