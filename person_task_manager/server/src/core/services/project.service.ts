import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response_helpers";
import { EXCEPTION_PREFIX, PROJECT_EXCEPTION, PROJECT_NOT_FOUND } from "../domain/constants/error.constant";
import { ProjectEntity } from "../domain/entities/project.entity";
import { projectValidation } from "../validations/project.validation";
import { groupTaskService } from "./group-task.service";

const projectValidationImpl = projectValidation;

class ProjectService {
    constructor() { }

    // Add Authen mechanism and try catch
    async createProject(project: any): Promise<IResponse> {
        const createProject = await ProjectEntity.create(project);

        return msg200({
            message: (createProject as any)
        });
    }

    async updateProject(projectId: string, project: any): Promise<IResponse> {
        try {
            if (await projectValidationImpl.checkExistedProjectById(projectId) === true) {
                const updateProject = await ProjectEntity.updateOne({ _id: projectId }, project);

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
            if (await projectValidationImpl.checkExistedProjectById(projectId) === true) {

                // delete all group tasks in project
                const groupTasks = await ProjectEntity.findOne({ _id: projectId }).select('groupTasks');
                if (groupTasks !== null) {
                    for (let i = 0; i < groupTasks.groupTasks.length; i++) {
                        await groupTaskService.deleteGroupTask(groupTasks.groupTasks[i], projectId);
                    }
                }

                const deleteProject = await ProjectEntity.deleteOne({ _id: projectId });

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
        const projects = await ProjectEntity.find({ ownerId: 1 });

        return msg200({
            projects
        });
    }

    async getGroupTasksInProject(projectId: string): Promise<IResponse> {
        try {
            const groupTasksInProject = await ProjectEntity.findOne({ _id: projectId }).populate('groupTasks');
            const groupTasks = groupTasksInProject?.groupTasks;

            return msg200({
                message: (groupTasks as any)
            });
        } catch (err: any) {
            return msg400(err.message.toString())
        }
    }

    async updateManyProjects(groupTaskId: string): Promise<IResponse> {
        const updateManyProjects = await ProjectEntity.updateMany({ groupTasks: groupTaskId }, { $pull: { groupTasks: groupTaskId } });

        return msg200({
            message: (updateManyProjects as any)
        });
    }

    async updateOrdinalNumber(projectId: string, groupTasks: string[]): Promise<IResponse> {
        const updateProject = await ProjectEntity.updateMany({ _id: projectId }, { groupTasks: groupTasks });

        return msg200({
            message: (updateProject as any)
        });
    }

    async updateProjectName(projectId: string, name: string): Promise<IResponse> {
        try {
            if (await projectValidationImpl.checkExistedProjectById(projectId) === true) {
                const project = await ProjectEntity.findOne({ _id: projectId });
                if (project === null) {
                    return msg400("Project not found");
                } else {
                    project.name = name;
                    await project.save();
                    return msg200({
                        message: "Project name updated successfully"
                    });
                }
            }
            return msg400("Project not found");
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }

    async updateProjectColor(projectId: string, color: string): Promise<IResponse> {
        try {
            if (await projectValidationImpl.checkExistedProjectById(projectId) === true) {
                const project = await ProjectEntity.findOne({ _id: projectId });
                if (project === null) {
                    return msg400("Project not found");
                } else {
                    project.color = color;
                    await project.save();
                    return msg200({
                        message: "Project color updated successfully"
                    });
                }
            }
            return msg400("Project not found");
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }

    // disable project

    // enable project

    // archive project
    
    // MINI SERVICES

    async getProjectByGroupTaskId(groupTaskId: string): Promise<string> {
        try {
            const project = await ProjectEntity.findOne({ groupTasks: groupTaskId });
            if (project === null) {
                return PROJECT_NOT_FOUND;
            } else {
                return project._id;
            }
        } catch (err: any) {
            return EXCEPTION_PREFIX+PROJECT_EXCEPTION
        }
    }

}

export const projectService = new ProjectService();