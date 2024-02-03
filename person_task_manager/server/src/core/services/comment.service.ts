import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response_helpers";
import { COMMENT_NOT_FOUND } from "../domain/constants/error.constant";
import { CommentEntity } from "../domain/entities/comment.entity";
import { ActiveStatus } from "../domain/enums/enums";
import { commentStore } from "../store/comment.store";
import { commentValidation } from "../validations/comment.validation";
import { taskService } from "./task.service";

const taskServiceImpl = taskService;
const commentValidationImpl = commentValidation;

class CommentService {
    constructor() {
    }

    async createComment(comment: any, taskId: string): Promise<IResponse> {
        try {
            const createComment = await commentStore.createComment(comment); 
            const commentId = (createComment as any)._id;

            if (await commentValidationImpl.checkExistedCommentInTask(commentId, taskId) === false) {
                taskServiceImpl.updateTask(taskId, { $push: { comments: commentId } });
                return msg200({
                    message: (createComment as any)
                });
            } else {
                await commentStore.deleteComment(commentId);
                return msg400('Comment is not created successfully');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async updateComment(commentId: string, comment: any): Promise<IResponse> {
        try {
            if (await commentValidationImpl.checkExistedCommentById(commentId) === true) {
                const updateComment = await commentStore.updateComment(commentId, comment);

                return msg200({
                    message: (updateComment as any)
                });
            } else {
                return msg400('Comment not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async deleteComment(commentId: string): Promise<IResponse> {
        try {
            if (await commentValidationImpl.checkExistedCommentById(commentId) === true) {
                const deleteComment = await commentStore.deleteComment(commentId);
                taskServiceImpl.updateManyCommentsInTask(commentId);

                return msg200({
                    message: (deleteComment as any)
                });
            } else {
                return msg400('Comment not found');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async getComment(commentId: string): Promise<IResponse> {
        const comment = await commentStore.findCommentById(commentId);
        return msg200({
            comment
        });
    }

    async archieveComment(commentId: string): Promise<IResponse | undefined> {
        try {
            if (await commentValidationImpl.checkExistedCommentById(commentId) === true) {
                const comment = await commentStore.findActiveCommentById(commentId);
                if (comment === null) {
                    return msg400(COMMENT_NOT_FOUND);
                } else {
                    await commentStore.archieveComment(commentId);
                    return msg200({
                        message: "Comment archieved successfully"
                    });
                }
            }
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }

    async enableComment(commentId: string): Promise<IResponse | undefined> {
        try {
            if (await commentValidationImpl.checkExistedCommentById(commentId) === true) {
                const comment = await commentStore.findInactiveCommentById(commentId);
                if (comment === null) {
                    return msg400(COMMENT_NOT_FOUND);
                } else {
                    await commentStore.enableComment(commentId);
                    return msg200({
                        message: "Comment enabled successfully"
                    });
                }
            }
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }
}

export const commentService = new CommentService();