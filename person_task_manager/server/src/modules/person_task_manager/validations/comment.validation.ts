import { CommentEntity } from "../entities/comment.entity"

export const commentValidation = {
    async checkExistedCommentByCommentId(commentId: string): Promise<boolean> {
        if (await CommentEntity.findOne({ _id: commentId }) != null) {
            return true; // existed
        }
        return false;
    },

    async checkExistedCommentInTask(commentId: string, taskId: string): Promise<boolean> {
        if (await CommentEntity.findOne({ _id: commentId, task: taskId }) != null) {
            return true; // existed
        }
        return false;
    },
}