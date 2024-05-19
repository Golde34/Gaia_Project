import { NOT_EXISTED } from "../domain/constants/constants";
import { userTagStore } from "../store/user-tag.store";

export const userTagValidation = {
    async checkExistedTagByTagId(tagId: string): Promise<boolean> {
        try {
            return await userTagStore.findOneTag(tagId) !== null;
        } catch (error: any) {
            console.log(error.message.toString());
            return NOT_EXISTED
        }
    },

    async checkExistedTagByUserIdAndTagName(userId: number, tagName: string): Promise<boolean> {
        try {
            return await userTagStore.findTagByUserIdAndTagName(userId, tagName) !== null;
        } catch (error: any) {
            console.log(error.message.toString());
            return NOT_EXISTED;
        }
    }
}