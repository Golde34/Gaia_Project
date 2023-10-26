import { IResponse } from "../../../common/response";
import { msg200 } from "../../../common/response_helpers";
import { CommentEntity } from "../entities/comment.entity";

class CommentService {
    constructor() {
    }

    async getComment(commentId: string): Promise<IResponse> {
        const comment = await CommentEntity.findOne({ _id: commentId });
        return msg200({
            comment
        });
    }

    async createComment(comment: any, taskId: string): Promise<IResponse> {
        const createComment = await CommentEntity.create(comment);
        const commentId = (createComment as any)._id;
        const commentUpdate = await CommentEntity.updateOne({ _id: commentId }, { $push: { tasks: taskId } });
        return msg200({
            message: (commentUpdate as any).message
        });
    }

    async updateComment(commentId: string, comment: any): Promise<IResponse> {
        const updateComment = await CommentEntity.updateOne({_id: commentId}, comment);
        return msg200({
            message: (updateComment as any).message
        });
    }

    async deleteComment(commentId: string): Promise<IResponse> {
        const deleteComment = await CommentEntity.deleteOne({_id: commentId});
        return msg200({
            message: (deleteComment as any).message
        });
    }    
}

export const commentService = new CommentService();