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

    async findTagsByUserId(userId: string): Promise<IUserTagEntity[] | null> {
        return await userTagRepository.findTagsByUserId(userId);
    }

    async findTagByUserIdAndTagName(userId: number, tagName: string): Promise<IUserTagEntity | null> {
        return await userTagRepository.findTagByUserIdAndTagName(userId, tagName);
    }

    async findOneTag(tagId: string): Promise<IUserTagEntity | null> {
        return await userTagRepository.findOneTag(tagId);
    }

    async archiveTag(tagId: string): Promise<UpdateWriteOpResult> {
        return await userTagRepository.archiveTag(tagId);
    }

    async enableTag(tagId: string): Promise<UpdateWriteOpResult> {
        return await userTagRepository.enableTag(tagId);
    }

    async findTagByProjectId(projectId: string): Promise<IUserTagEntity | null> {
        return await userTagRepository.findTagByProjectId(projectId);
    }

    async findTagByGroupTaskId(groupTaskId: string): Promise<IUserTagEntity | null> {
        return await userTagRepository.findTagByGroupTaskId(groupTaskId);
    }

    async findTagByTaskId(taskId: string): Promise<IUserTagEntity | null> {
        return await userTagRepository.findTagByTaskId(taskId);
    }

    async findTagByTagId(tagId: string): Promise<IUserTagEntity | null> {
        return await userTagRepository.findTagByTagId(tagId);
    }
}

export const userTagStore = new UserTagStore();