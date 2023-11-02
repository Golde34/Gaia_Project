import { IResponse } from "../../../common/response";
import { msg200, msg400 } from "../../../common/response_helpers";
import { ProjectEntity } from "../entities/project.entity";
import { projectValidation } from "../validations/project.validation";

const projectValidationImpl = projectValidation;

class ProjectService {
    constructor() {}

    async createProject(project: any): Promise<IResponse> {
        const createProject = await ProjectEntity.create(project);
        
        return msg200({
            message: (createProject as any)
        });
    }

    async updateProject(projectId: string, project: any): Promise<IResponse> {
        try {
            if (await projectValidationImpl.checkExistedProjectByProjectId(projectId)) {
                const updateProject = await ProjectEntity.updateOne({_id: projectId}, project);
                
                return msg200({
                    message: JSON.stringify(updateProject)
                });             
            } else {
                return msg400("Project not found");
            }
        } catch (err: any) {
            return msg400(err.message.toString())
        }
    }


    async deleteProject(projectId: string): Promise<IResponse> {
        try {
            if (await projectValidationImpl.checkExistedProjectByProjectId(projectId)) {
                const deleteProject = await ProjectEntity.deleteOne({_id: projectId});
                
                return msg200({
                    message: JSON.stringify(deleteProject)
                });
            } else {
                return msg400("Project not found");
            }
        } catch (err: any) {
            return msg400(err.message.toString())
        }
    }

    async getProject(projectId: string): Promise<IResponse> {
        const project = await ProjectEntity.findOne({ _id: projectId });   
        
        return msg200({
            project
        });
    }

    async getAllProjects(): Promise<IResponse> {
        const projects = await ProjectEntity.find({ ownerId: 1});
        
        return msg200({
            projects
        });
    }

    async getGroupTasksInProject(projectId: string): Promise<IResponse> {
        const groupTasks = await ProjectEntity.findOne({_id: projectId}).populate('groupTasks');
        
        return msg200({
            message: (groupTasks as any)
        });
    }

    async updateManyProjects(data: any, project: any): Promise<IResponse> {
        const updateManyProjects = await ProjectEntity.updateMany({data}, project);
        
        return msg200({
            message: (updateManyProjects as any)
        });
    }

    // disable project

    // enable project

    // archive project
}

export const projectService = new ProjectService();