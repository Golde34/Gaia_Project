import { TaskTag } from "../../core/domain/dtos/request_dtos/tag.dto";
import { IUserTagEntity, UserTagEntity } from "../entities/user-tag.entity";

class UserTagRepository {
    constructor() {}

    async createUserTag(tag: TaskTag): Promise<IUserTagEntity> {
        return await UserTagEntity.create(tag);
    }
}

export const userTagRepository = new UserTagRepository();