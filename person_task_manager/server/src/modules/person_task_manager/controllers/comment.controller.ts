import { Router } from "express";
import { sendResponse } from "../../../common/response_helpers";
import { commentService } from "../services/comment.service";

export const commentRouter = Router();

// get one comment
commentRouter.get("/:id", async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const commentResult = await commentService.getComment(commentId);

        sendResponse(commentResult, res, next);
    } catch (err) {
        next(err);
    }
});

// create comment
commentRouter.post("/create", async (req, res, next) => {
    try {
        const comment = req.body;
        const taskId = req.body.taskId;        
        const commentResult = await commentService.createComment(comment, taskId);

        sendResponse(commentResult, res, next);
    } catch (err) {
        next(err);
    }
});

// update comment
commentRouter.put("/:id", async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const comment = req.body;        
        const commentResult = await commentService.updateComment(commentId, comment);

        sendResponse(commentResult, res, next);
    } catch (err) {
        next(err);
    }
});

// delete comment
commentRouter.delete("/:id", async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const commentResult = await commentService.deleteComment(commentId);

        sendResponse(commentResult, res, next);
    } catch (err) {
        next(err);
    }
});

