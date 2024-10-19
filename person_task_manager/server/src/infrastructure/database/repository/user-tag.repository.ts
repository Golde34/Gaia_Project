import { UpdateWriteOpResult } from "mongoose";
import { DeleteResult } from "mongodb";
import { TaskTag } from "../../../core/domain/dtos/request_dtos/tag.dto";
import { UserTagEntity } from "../model-repository/user-tag.model";
import { ActiveStatus } from "../../../core/domain/enums/enums";
import { ProjectEntity } from "../model-repository/project.model";
import { GroupTaskEntity } from "../model-repository/group-task.model";
import { TaskEntity } from "../model-repository/task.model";
import { IUserTagEntity } from "../../../core/domain/entities/user-tag.entity";

class UserTagRepository {
    constructor() { }

    async createUserTag(tag: TaskTag): Promise<IUserTagEntity> {
        return await UserTagEntity.create(tag);
    }

    async updateUserTag(tagId: string, tag: TaskTag): Promise<UpdateWriteOpResult> {
        return await UserTagEntity.updateOne({ _id: tagId }, tag);
    }

    async deleteUserTag(tagId: string): Promise<DeleteResult> {
        return await UserTagEntity.deleteOne({ _id: tagId });
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
            .updateOne({ _id: tagId },
                { activeStatus: ActiveStatus.active });
    }

    async findTagByProjectId(projectId: string): Promise<IUserTagEntity | null> {
        const project = await ProjectEntity.findOne({ _id: projectId }).populate('tag');
        return project ? project.tag : null;
    }

    async findTagByGroupTaskId(groupTaskId: string): Promise<IUserTagEntity | null> {
        const groupTask = await GroupTaskEntity.findOne({
            _id: groupTaskId
        }).populate('tag');
        return groupTask ? groupTask.tag : null;
    }

    async findTagByTaskId(taskId: string): Promise<IUserTagEntity | null> {
        const task = await TaskEntity.findOne({ _id: taskId }).populate('tag');
        return task ? task.tag : null; 
    }

    async findTagByTagId(tagId: string): Promise<IUserTagEntity | null> {
        return await UserTagEntity.findOne({ _id: tagId });
    }
}
export const userTagRepository = new UserTagRepository();