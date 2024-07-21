import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response_helpers";
import { EXCEPTION_PREFIX, PROJECT_EXCEPTION, PROJECT_NOT_FOUND } from "../domain/constants/error.constant";
import { ActiveStatus } from "../domain/enums/enums";
import { projectStore } from "../store/project.store";
import { projectValidation } from "../validations/project.validation";
import { groupTaskService } from "./group-task.service";

const projectValidationImpl = projectValidation;

class ProjectService {
    constructor() { }

    // Add Authen mechanism and try catch
    async createProject(project: any): Promise<IResponse> {
        if (project.color == null || project.color == "") {
            project.color = "indigo";
        }
        if (project.activeStatus == null || project.activeStatus === "") {
            project.activeStatus = ActiveStatus.active;
        }

        const createProject = await projectStore.createProject(project);

        return msg200({
            message: (createProject as any)
        });
    }

    async updateProject(projectId: string, project: any): Promise<IResponse> {
        try {
            if (await projectValidationImpl.checkExistedProjectById(projectId) === true) {
                const updateProject = await projectStore.updateOneProject(projectId, project);

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
                const groupTasks = await projectStore.findOneProjectWithGroupTasks(projectId);
                if (groupTasks !== null) {
                    for (let i = 0; i < groupTasks.groupTasks.length; i++) {
                        await groupTaskService.deleteGroupTask(groupTasks.groupTasks[i], projectId);
                    }
                }

                const deleteProject = await projectStore.deleteOneProject(projectId);

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
        const project = await projectStore.findOneProjectById(projectId);

        return msg200({
            project
        });
    }

    async getAllProjects(): Promise<IResponse> {
        const projects = await projectStore.findAllProjectsByOwnerId(1);

        return msg200({
            projects
        });
    }

    async getGroupTasksInProject(projectId: string): Promise<IResponse> {
        try {
            const groupTasksInProject = await projectStore.findAllActiveGroupTasksByProjectId(projectId);
            const groupTasks = groupTasksInProject?.groupTasks;

            return msg200({
                message: (groupTasks as any)
            });
        } catch (err: any) {
            return msg400(err.message.toString())
        }
    }

    async updateManyProjects(groupTaskId: string): Promise<IResponse> {
        const updateManyProjects = await projectStore.pullGroupTaskFromAllProjects(groupTaskId);

        return msg200({
            message: (updateManyProjects as any)
        });
    }

    async updateGroupTaskIdListInProject(projectId: string, groupTasks: string[]): Promise<IResponse> {
        const updateProject = await projectStore.updateGroupTaskIdListInProject(projectId, groupTasks);

        return msg200({
            message: (updateProject as any)
        });
    }

    async updateProjectName(projectId: string, name: string): Promise<IResponse> {
        try {
            if (await projectValidationImpl.checkExistedProjectById(projectId) === true) {
                const project = await projectStore.findOneProjectById(projectId);
                if (project === null) {
                    return msg400("Project not found");
                } else {
                    project.name = name;
                    await projectStore.updateOneProject(projectId, project);
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
                const project = await projectStore.findOneProjectById(projectId);
                if (project === null) {
                    return msg400("Project not found");
                } else {
                    project.color = color;
                    await projectStore.updateOneProject(projectId, project);
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

    async archiveProject(projectId: string): Promise<IResponse | undefined> {
        try {
            if (await projectValidationImpl.checkExistedProjectById(projectId) === true) {
                const project = await projectStore.findOneActiveProjectById(projectId);
                if (project === null) {
                    return msg400(PROJECT_NOT_FOUND);
                } else {
                    await projectStore.archiveProject(projectId);
                    return msg200({
                        message: "Project archived"
                    });
                }
            }
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }

    async enableProject(projectId: string): Promise<IResponse | undefined> {
        try {
            if (await projectValidationImpl.checkExistedProjectById(projectId) === true) {
                const project = await projectStore.findOneInactiveProjectById(projectId);
                if (project === null) {
                    return msg400(PROJECT_NOT_FOUND);
                } else {
                    await projectStore.enableProject(projectId);
                    return msg200({
                        message: "Project enabled"
                    });
                }
            }
        } catch (err: any) {
            return msg400(err.message.toString());
        }
    }

    async checkExistedTasks(userId: number): Promise<IResponse> {
        try {
            const projects = await projectStore.findAllProjectsByOwnerId(userId);
            let existedTasks: boolean;
            if (projects.length === 0) {
                existedTasks = false;
            } 
            existedTasks = true;
            
            return msg200({
                message: {existedTasks}
            });
        } catch (err: any) {
            console.log("Could not check existed tasks: ", err);
            return msg400(err.message.toString());
        }
    }

    // MINI SERVICES

    async getProjectByGroupTaskId(groupTaskId: string): Promise<string> {
        try {
            const project = await projectStore.findOneProjectByGroupTaskId(groupTaskId);
            if (project === null) {
                return PROJECT_NOT_FOUND;
            } else {
                return project._id;
            }
        } catch (err: any) {
            return EXCEPTION_PREFIX + PROJECT_EXCEPTION
        }
    }

}

export const projectService = new ProjectService();