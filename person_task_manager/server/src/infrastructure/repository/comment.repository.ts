import { UpdateWriteOpResult } from "mongoose";
import { CommentEntity, ICommentEntity } from "../../core/domain/entities/comment.entity";
import { DeleteResult } from "mongodb";
import { ActiveStatus } from "../../core/domain/enums/enums";

class CommentRepository {
    constructor() {}
    
    async createComment(comment: Comment): Promise<ICommentEntity> {
        return await CommentEntity.create(comment);
    }

    async updateComment(commentId: string, comment: Comment): Promise<UpdateWriteOpResult> {
        return await CommentEntity.updateOne({ _id: commentId }, comment);
    }

    async deleteComment(commentId: string): Promise<DeleteResult> {
        return await CommentEntity.deleteOne({ _id: commentId });
    }

    async findCommentById(commentId: string): Promise<ICommentEntity | null> {
        return await CommentEntity.findOne({ _id: commentId });
    }

    async findActiveCommentById(commentId: string): Promise<ICommentEntity | null> {
        return await CommentEntity.findOne({ _id: commentId, activeStatus: ActiveStatus.active });
    }

    async findInactiveCommentById(commentId: string): Promise<ICommentEntity | null> {
        return await CommentEntity.findOne({ _id: commentId, activeStatus: ActiveStatus.inactive });
    }

    async archieveComment(commentId: string): Promise<UpdateWriteOpResult> {
        return await CommentEntity.updateOne({ _id: commentId }, { activeStatus: ActiveStatus.inactive });
    }

    async enableComment(commentId: string): Promise<UpdateWriteOpResult> {
        return await CommentEntity.updateOne({ _id: commentId }, { activeStatus: ActiveStatus.active });
    }
}

export const commentRepository = new CommentRepository();