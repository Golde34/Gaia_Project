import { UpdateWriteOpResult } from "mongoose";
import { DeleteResult } from "mongodb";
import { TaskTag } from "../../core/domain/dtos/request_dtos/tag.dto";
import { IUserTagEntity, UserTagEntity } from "../entities/user-tag.entity";
import { ActiveStatus } from "../../core/domain/enums/enums";

class UserTagRepository {
    constructor() {}

    async createUserTag(tag: TaskTag): Promise<IUserTagEntity> {
        return await UserTagEntity.create(tag);
    }

    async updateUserTag(tagId: string, tag: TaskTag): Promise<UpdateWriteOpResult> {
        return await UserTagEntity.updateOne({ _id: tagId }, tag);
    }

    async deleteUserTag(tagId: string): Promise<DeleteResult> {
        return await UserTagEntity.deleteOne({ _id: tagId});
    }

    async findTagsByUserId(userId: string): Promise<IUserTagEntity[] | null> {
        return await UserTagEntity.find({
            ownerId: userId,
            ActiveStatus: ActiveStatus.active
        });
    }

    async findTagByUserIdAndTagName(userId: number, tagName: string): Promise<IUserTagEntity | null> {
        return await UserTagEntity.findOne({
            ownerId: userId,
            name: tagName,
            activeStatus: ActiveStatus.active
        });
    }

    async findOneTag(tagId: string): Promise<IUserTagEntity | null> {
        return await UserTagEntity.findOne({ _id: tagId });
    }

    async archiveTag(tagId: string): Promise<UpdateWriteOpResult> {
        return await UserTagEntity
            .updateOne({ _id: tagId },
                { activeStatus: ActiveStatus.inactive });
    }

    async enableTag(tagId: string): Promise<UpdateWriteOpResult> {
        return await UserTagEntity
            .updateOne({ _id: tagId}, 
                { activeStatus: ActiveStatus.active});
    }
}

export const userTagRepository = new UserTagRepository();