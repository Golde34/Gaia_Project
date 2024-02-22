import { NextFunction, Request, Response, Router } from "express";
import { RequestValidator } from "../../core/common/error-handler";
import { CommentRequestDto } from "../../core/domain/dtos/comment.dto";
import { commentController } from "../controllers/comment.controller";
import { returnResult } from "../../kernel/util/return-result";
import { ARCHIVE_COMMENT_FAILED, COMMENT_NOT_FOUND, CREATE_COMMENT_FAILED, DELETE_COMMENT_FAILED, ENABLE_COMMENT_FAILED, UPDATE_COMMENT_FAILED } from "../../core/domain/constants/error.constant";

export const commentRouter = Router();

const commentControllerImpl = commentController;

// get one comment
commentRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const commentResult = await commentControllerImpl.getCommentById(req, next);
        returnResult(commentResult, COMMENT_NOT_FOUND, res, next)
    } catch (err) {
        next(err);
    }
});

// create comment
commentRouter.post("/create", 
    RequestValidator.validate(CommentRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const commentResult = await commentControllerImpl.createComment(req, next);
        returnResult(commentResult, CREATE_COMMENT_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// update comment
commentRouter.put("/:id", 
    RequestValidator.validate(CommentRequestDto),
    async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const commentResult = await commentControllerImpl.updateComment(req, next);
        returnResult(commentResult, UPDATE_COMMENT_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// delete comment
commentRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const commentResult = await commentControllerImpl.deleteComment(req, next);
        returnResult(commentResult, DELETE_COMMENT_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// archive comment
commentRouter.put("/:id/archive", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const commentResult = await commentControllerImpl.archiveComment(req, next);
        returnResult(commentResult, ARCHIVE_COMMENT_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// enable comment
commentRouter.put("/:id/enable", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const commentResult = await commentControllerImpl.enableComment(req, next);
        returnResult(commentResult, ENABLE_COMMENT_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});
