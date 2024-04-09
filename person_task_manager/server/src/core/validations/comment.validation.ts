import { CommentEntity } from "../domain/entities/comment.entity"

export const commentValidation = {
    async checkExistedCommentById(commentId: string): Promise<boolean> {
        try {
            const existedComment = await CommentEntity.findOne({ _id: commentId }) != null
            return existedComment;
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedCommentInTask(commentId: string, taskId: string): Promise<boolean> {
        try {
            const existedComment = await CommentEntity.findOne({ _id: commentId, task: taskId }) != null
            return existedComment;
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },
}