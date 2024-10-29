import { NextFunction, type Request, type Response, Router } from "express";
import { returnResult } from "../../kernel/util/return-result";
import { CREATE_NOTE_FAILED, NOTE_NOT_FOUND, UPDATE_NOTE_FAILED } from "../../core/domain/constants/error.constant";
import { RequestValidator } from "../../core/common/error-handler";
import { noteController } from "../controllers/note.controller";
import { NoteRequestDto } from "../../core/domain/dtos/note.dto";

export const noteRouter = Router();

const noteControllerImpl = noteController;

noteRouter.get("/:userId/",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.getNotes(req, next);
            return returnResult(noteResult, NOTE_NOT_FOUND, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.post("/create",
    RequestValidator.validateV2(NoteRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.createNote(req, next);
            return returnResult(noteResult, CREATE_NOTE_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.put("/update-file-status/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.updateNoteFileStatus(req, next);
            return returnResult(noteResult, UPDATE_NOTE_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.put("/update",
    RequestValidator.validateV2(NoteRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.updateNote(req, next);
            return returnResult(noteResult, UPDATE_NOTE_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.get("/detail/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.getNoteById(req, next);
            return returnResult(noteResult, NOTE_NOT_FOUND, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.put("/lock/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.lockNoteById(req, next);
            return returnResult(noteResult, UPDATE_NOTE_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.put("/unlock/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.unlockNoteById(req, next);
            return returnResult(noteResult, UPDATE_NOTE_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.delete("/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.deleteNoteById(req, next);
            return returnResult(noteResult, UPDATE_NOTE_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.put("/archive/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.archiveNoteById(req, next);
            return returnResult(noteResult, UPDATE_NOTE_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

noteRouter.put("/enable/:id",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const noteResult = await noteControllerImpl.enableNoteById(req, next);
            return returnResult(noteResult, UPDATE_NOTE_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });
