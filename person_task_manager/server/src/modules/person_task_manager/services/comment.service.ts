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

    async getAllComments(): Promise<IResponse> {
        const comments = await CommentEntity.find();
        return msg200({
            comments
        });

    }

    async createComment(comment: any): Promise<IResponse> {
        const createComment = await CommentEntity.create(comment);
        return msg200({
            message: (createComment as any).message
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