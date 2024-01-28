import { CommentEntity } from "../domain/entities/comment.entity"

export const commentValidation = {
    async checkExistedCommentById(commentId: string): Promise<boolean> {
        try {
            if (await CommentEntity.findOne({ _id: commentId }) != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },

    async checkExistedCommentInTask(commentId: string, taskId: string): Promise<boolean> {
        try {
            if (await CommentEntity.findOne({ _id: commentId, task: taskId }) != null) {
                return true; // existed
            } else {
                return false;
            }
        } catch (error: any) {
            console.log(error.message.toString());
            return false;
        }
    },
}