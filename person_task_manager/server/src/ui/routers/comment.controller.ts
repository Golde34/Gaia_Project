import { NextFunction, Request, Response, Router } from "express";
import { sendResponse } from "../../core/common/response_helpers";
import { commentService } from "../../core/services/comment.service";
import { RequestValidator } from "../../core/common/error-handler";
import { CommentRequestDto } from "../../core/domain/dtos/comment.dto";
import { plainToInstance } from "class-transformer";

export const commentRouter = Router();

// get one comment
commentRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const commentId = req.params.id;
        const commentResult = await commentService.getComment(commentId);

        sendResponse(commentResult, res, next);
    } catch (err) {
        next(err);
    }
});

// create comment
commentRouter.post("/create", 
    RequestValidator.validate(CommentRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;
        
        const comment = plainToInstance(CommentRequestDto, bodyJson);
        const taskId = bodyJson.taskId;
        const commentResult = await commentService.createComment(comment, taskId);

        sendResponse(commentResult, res, next);
    } catch (err) {
        next(err);
    }
});

// update comment
commentRouter.put("/:id", 
    RequestValidator.validate(CommentRequestDto),
    async (req: Request, res: Response, next:NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const commentId = req.params.id;
        const comment = plainToInstance(CommentRequestDto, bodyJson);        
        const commentResult = await commentService.updateComment(commentId, comment);

        sendResponse(commentResult, res, next);
    } catch (err) {
        next(err);
    }
});

// delete comment
commentRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const commentId = req.params.id;
        const commentResult = await commentService.deleteComment(commentId);

        sendResponse(commentResult, res, next);
    } catch (err) {
        next(err);
    }
});

