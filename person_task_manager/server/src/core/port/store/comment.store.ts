import { UpdateWriteOpResult } from "mongoose";
import { commentRepository } from "../../../infrastructure/database/repository/comment.repository";
import { DeleteResult } from "mongodb";
import { ICommentEntity } from "../../../infrastructure/database/entities/comment.entity";

class CommentStore {
    constructor() { }

    async createComment(comment: any): Promise<ICommentEntity> {
        return await commentRepository.createComment(comment);
    }

    async updateComment(commentId: string, comment: any): Promise<UpdateWriteOpResult> {
        return await commentRepository.updateComment(commentId, comment);
    }

    async deleteComment(commentId: string): Promise<DeleteResult> {
        return await commentRepository.deleteComment(commentId);
    }

    async findCommentById(commentId: string): Promise<ICommentEntity | null> {
        return await commentRepository.findCommentById(commentId);
    }

    async findActiveCommentById(commentId: string): Promise<ICommentEntity | null> {
        return await commentRepository.findActiveCommentById(commentId);
    }

    async findInactiveCommentById(commentId: string): Promise<ICommentEntity | null> {
        return await commentRepository.findInactiveCommentById(commentId);
    }

    async archiveComment(commentId: string): Promise<UpdateWriteOpResult> {
        return await commentRepository.archiveComment(commentId);
    }

    async enableComment(commentId: string): Promise<UpdateWriteOpResult> {
        return await commentRepository.enableComment(commentId);
    }
}

export const commentStore = new CommentStore();