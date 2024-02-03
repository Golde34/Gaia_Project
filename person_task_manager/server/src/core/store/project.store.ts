import { UpdateWriteOpResult } from "mongoose";
import { projectRepository } from "../../infrastructure/repository/project.repository";
import { IProjectEntity } from "../domain/entities/project.entity";
import { DeleteResult } from "mongodb";

class ProjectStore {
    constructor() {}

    async createProject(project: any): Promise<IProjectEntity> {
        return projectRepository.createProject(project);
    }

    async updateOneProject(projectId: string, project: any): Promise<UpdateWriteOpResult> {
        return projectRepository.updateOneProject(projectId, project);
    }

    async deleteOneProject(projectId: string): Promise<DeleteResult> {
        return projectRepository.deleteOneProject(projectId);
    }

    async findOneProjectById(projectId: string): Promise<IProjectEntity | null> {
        return projectRepository.findOneProjectById(projectId);
    }

    async findOneProjectWithGroupTasks(projectId: string): Promise<IProjectEntity> {
        return projectRepository.findOneProjectWithGroupTasks(projectId);
    }

    async findAllProjectsByOwnerId(ownerId: number): Promise<IProjectEntity[]> { 
        return projectRepository.findAllProjectsByOwnerId(ownerId);
    }

    async findAllActiveGroupTasksByProjectId(projectId: string): Promise<IProjectEntity | null> {
        return projectRepository.findAllActiveGroupTasksByProjectId(projectId);
    }

    async pullGroupTaskFromAllProjects(groupTaskId: string): Promise<UpdateWriteOpResult> {
        return projectRepository.pullGroupTaskFromAllProjects(groupTaskId);
    }

    async pullGrouptaskFromProject(projectId: string, groupTaskId: string): Promise<UpdateWriteOpResult> {
        return projectRepository.pullGrouptaskFromProject(projectId, groupTaskId);
    }

    async updateGroupTaskIdListInProject(projectId: string, groupTasks: string[]): Promise<UpdateWriteOpResult> {
        return projectRepository.updateGroupTaskIdListInProject(projectId, groupTasks);
    }

    async findOneActiveProjectById(projectId: string): Promise<IProjectEntity | null> {
        return projectRepository.findOneActiveProjectById(projectId);
    }

    async findOneInactiveProjectById(projectId: string): Promise<IProjectEntity | null> {
        return projectRepository.findOneInactiveProjectById(projectId);
    }

    async findOneProjectByGroupTaskId(groupTaskId: string): Promise<IProjectEntity | null> {
        return projectRepository.findOneProjectByGroupTaskId(groupTaskId);
    }

    async archieveProject(projectId: string): Promise<UpdateWriteOpResult> {
        return projectRepository.archieveProject(projectId);
    }

    async enableProject(projectId: string): Promise<UpdateWriteOpResult> {
        return projectRepository.enableProject(projectId);
    }
}

export const projectStore = new ProjectStore();