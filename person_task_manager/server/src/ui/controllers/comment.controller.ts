import { NextFunction, Request } from "express";
import { IResponse } from "../../core/common/response";
import { commentService } from "../../core/services/comment.service";
import { plainToInstance } from "class-transformer";
import { CommentRequestDto } from "../../core/domain/dtos/comment.dto";

class CommentController {
    constructor() {}

    async getCommentById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const commentId = req.params.id;
            const commentResult = await commentService.getComment(commentId);

            return commentResult;
        } catch (err) {
            next(err);
        }
    }

    async createComment(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;
            
            const comment = plainToInstance(CommentRequestDto, bodyJson);
            const taskId = bodyJson.taskId;
            const commentResult = await commentService.createComment(comment, taskId);

            return commentResult;
        } catch (err) {
            next(err);
        }
    }

    async updateComment(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;

            const commentId = req.params.id;
            const comment = plainToInstance(CommentRequestDto, bodyJson);        
            const commentResult = await commentService.updateComment(commentId, comment);

            return commentResult;
        } catch (err) {
            next(err);
        }
    }

    async deleteComment(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const commentId = req.params.id;
            const commentResult = await commentService.deleteComment(commentId);

            return commentResult;
        } catch (err) {
            next(err);
        }
    }

    async archieveComment(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const commentId = req.params.id;
            const commentResult = await commentService.archieveComment(commentId);

            return commentResult;
        } catch (err) {
            next(err);
        }
    }

    async enableComment(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const commentId = req.params.id;
            const commentResult = await commentService.enableComment(commentId);

            return commentResult;
        } catch (err) {
            next(err);
        }
    }
}

export const commentController = new CommentController();