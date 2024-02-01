import { DeleteResult } from "mongodb";
import { IProjectEntity, ProjectEntity } from "../../core/domain/entities/project.entity";
import { UpdateWriteOpResult } from "mongoose";
import { ActiveStatus } from "../../core/domain/enums/enums";

class ProjectRepository {
    constructor() { }

    async createProject(project: any): Promise<IProjectEntity> {
        return await ProjectEntity.create(project);
    }

    async updateOneProject(projectId: string, project: any): Promise<UpdateWriteOpResult> {
        return await ProjectEntity.updateOne({ _id: projectId }, project);
    }

    async deleteOneProject(projectId: string): Promise<DeleteResult> {
        return await ProjectEntity.deleteOne({ _id: projectId });
    }

    async findOneProjectById(projectId: string): Promise<IProjectEntity | null> {
        return await ProjectEntity.findOne({ _id: projectId });
    }

    async findOneProjectWithGroupTasks(projectId: string): Promise<IProjectEntity> {
        return await ProjectEntity
            .findOne({ _id: projectId, activeStatus: ActiveStatus.active })
            .select('groupTasks');
    }

    async findAllProjectsByOwnerId(ownerId: number): Promise<IProjectEntity[]> {
        return await ProjectEntity
            .find({ ownerId: ownerId, activeStatus: ActiveStatus.active });
    }

    async findAllActiveGroupTasksByProjectId(projectId: string): Promise<IProjectEntity | null> {
        return await ProjectEntity.findOne({ _id: projectId })
            .populate({
                path: 'groupTasks',
                match: { activeStatus: ActiveStatus.active },
            }).exec();
    }

    async pullGroupTaskFromAllProjects(groupTaskId: string): Promise<UpdateWriteOpResult> {
        return await ProjectEntity
            .updateMany({ groupTasks: groupTaskId }, { $pull: { groupTasks: groupTaskId } });
    }

    async updateOrdinalNumberOfGroupTasks(projectId: string, groupTasks: string[]): Promise<UpdateWriteOpResult> {
        return await ProjectEntity.updateMany({ _id: projectId }, { groupTasks: groupTasks });
    }

    async findOneActiveProjectById(projectId: string): Promise<IProjectEntity | null> {
        return await ProjectEntity
            .findOne({ _id: projectId, activeStatus: ActiveStatus.active });
    }

    async findOneInactiveProjectById(projectId: string): Promise<IProjectEntity | null> {
        return await ProjectEntity
            .findOne({ _id: projectId, activeStatus: ActiveStatus.inactive });
    }

    async findOneProjectByGroupTaskId(groupTaskId: string): Promise<IProjectEntity | null> {
        return await ProjectEntity
            .findOne({ groupTasks: groupTaskId })
    }
}

export const projectRepository = new ProjectRepository();