import { UpdateWriteOpResult } from "mongoose";
import { DeleteResult } from "mongodb";
import { IUserTagEntity } from "../../infrastructure/entities/user-tag.entity";
import { userTagRepository } from "../../infrastructure/repository/user-tag.repository";
import { TaskTag } from "../domain/dtos/request_dtos/tag.dto";


class UserTagStore {
    constructor() {}

    async createUserTag(tag: TaskTag): Promise<IUserTagEntity> {
        return await userTagRepository.createUserTag(tag);
    }

    async updateUserTag(tagId: string, tag: TaskTag): Promise<UpdateWriteOpResult> {
        return await userTagRepository.updateUserTag(tagId, tag);
    }

    async deleteUserTag(tagId: string): Promise<DeleteResult> {
        return await userTagRepository.deleteUserTag(tagId);
    }
}

export const userTagStore = new UserTagStore();