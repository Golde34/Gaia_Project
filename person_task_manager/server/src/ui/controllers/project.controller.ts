import { NextFunction, Request } from "express";
import { projectService } from "../../core/services/project.service";
import { IResponse } from "../../core/common/response";
import { plainToInstance } from "class-transformer";
import { ProjectRequestDto } from "../../core/domain/dtos/project.dto";

class ProjectController {

    constructor() { }
    
    async listAllProjects(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const projectResult = await projectService.getAllProjects();

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async getProjectById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const id = req.params.id;
            const projectResult = await projectService.getProject(id);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async createProject(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body;        

            const createProjectObjectDto = plainToInstance(ProjectRequestDto, bodyJson);
            const projectResult = await projectService.createProject(createProjectObjectDto);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async updateProject(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const id = req.params.id;
            const bodyJson = req.body.body;

            const updateProjectObjectDto = plainToInstance(ProjectRequestDto, bodyJson);
            const projectResult = await projectService.updateProject(id, updateProjectObjectDto);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async deleteProject(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const id = req.params.id;
            const projectResult = await projectService.deleteProject(id);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async getGroupTasksInProject(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const id = req.params.id;
            const projectResult = await projectService.getGroupTasksInProject(id);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async updateProjectName(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const id = req.params.id;
            const bodyJson = req.body;
            const name = bodyJson.name;

            const projectResult = await projectService.updateProjectName(id, name);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async updateProjectColor(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const id = req.params.id;
            const bodyJson = req.body;
            const color = bodyJson.color;

            const projectResult = await projectService.updateProjectColor(id, color);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async archiveProject(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const id = req.params.id;
            const projectResult = await projectService.archiveProject(id);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }

    async enableProject(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const id = req.params.id;
            const projectResult = await projectService.enableProject(id);

            return projectResult;
        } catch (err) {
            next(err);
        }
    }
}

export const projectController = new ProjectController();