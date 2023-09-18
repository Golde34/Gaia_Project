import { IResponse } from "../../../common/response";
import { msg200 } from "../../../common/response_helpers";
import { ProjectEntity } from "../entities/project.entity";

export class ProjectService {
    constructor() {}

    async getProject(projectId: string): Promise<IResponse> {
        const project = await ProjectEntity.findOne({ _id: projectId });   
        return msg200({
            project
        });
    }

    async getAllProjects(): Promise<IResponse> {
        const projects = await ProjectEntity.find();
        return msg200({
            projects
        });
    }

    async createProject(project: any): Promise<IResponse> {
        const createProject = await ProjectEntity.create(project);
        return msg200({
            message: (createProject as any).message
        });
    }

    async updateProject(projectId: string, project: any): Promise<IResponse> {
        const updateProject = await ProjectEntity.updateOne({_id: projectId}, project);
        return msg200({
            message: (updateProject as any).message
        });
    }

    async deleteProject(projectId: string): Promise<IResponse> {
        const deleteProject = await ProjectEntity.deleteOne({_id: projectId});
        return msg200({
            message: (deleteProject as any).message
        });
    }
}