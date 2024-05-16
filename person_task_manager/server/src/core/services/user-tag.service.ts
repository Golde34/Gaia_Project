import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response_helpers";
import { TaskTag } from "../domain/dtos/request_dtos/tag.dto";
import { userTagStore } from "../store/user-tag.store";

class UserTagService {
    constructor() {}

    async createUserTag(userTag: TaskTag): Promise<IResponse> {
        try {
            const createUserTagResult = await userTagStore.createUserTag(userTag);
            return msg200('User tag is created successfully');
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }
}

export const userTagService = new UserTagService();