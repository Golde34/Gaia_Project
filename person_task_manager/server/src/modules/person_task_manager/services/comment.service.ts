import { IResponse } from "../../../common/response";
import { msg200, msg400 } from "../../../common/response_helpers";
import { CommentEntity } from "../entities/comment.entity";
import { commentValidation } from "../validations/comment.validation";
import { taskService } from "./task.service";

const taskServiceImpl = taskService;
const commentValidationImpl = commentValidation;

class CommentService {
    constructor() {
    }

    async createComment(comment: any, taskId: string): Promise<IResponse> {
        try {
            const createComment = await CommentEntity.create(comment);
            const commentId = (createComment as any)._id;

            if (await commentValidationImpl.checkExistedCommentInTask(commentId, taskId) === false) {
                taskServiceImpl.updateTask(taskId, { $push: { comments: commentId } });
                return msg200({
                    message: (createComment as any)
                });
            } else {
                const deletedInitComment = await CommentEntity.deleteOne({ _id: commentId });
                return msg400('Comment is not created successfully');
            }
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async updateComment(commentId: string, comment: any): Promise<IResponse> {
        try {
            if (await commentValidationImpl.checkExistedCommentById(commentId) === true) {
                const updateComment = await CommentEntity.updateOne({ _id: commentId }, comment);

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
                const deleteComment = await CommentEntity.deleteOne({ _id: commentId });
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
        const comment = await CommentEntity.findOne({ _id: commentId });
        return msg200({
            comment
        });
    }
}

export const commentService = new CommentService();