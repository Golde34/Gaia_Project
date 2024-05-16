import { IUserTagEntity } from "../../infrastructure/entities/user-tag.entity";
import { userTagRepository } from "../../infrastructure/repository/user-tag.repository";
import { TaskTag } from "../domain/dtos/request_dtos/tag.dto";

class UserTagStore {
    constructor() {}

    async createUserTag(tag: TaskTag): Promise<IUserTagEntity> {
        return await userTagRepository.createUserTag(tag);
    }
}

export const userTagStore = new UserTagStore();