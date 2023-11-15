import { NextFunction, Request, Response, Router } from "express";
import { sendResponse } from "../../../common/response_helpers";
import { projectService } from "../services/project.service";
import { RequestValidator } from "../../../common/error-handler";
import { ProjectRequestDto, UpdateColorDto } from "../dtos/project.dto";
import { plainToInstance } from "class-transformer";
import { updateNameRequestDto } from "../dtos/request_dtos/update-name-request.dto";

export const projectRouter = Router();

// list all projects of the user
projectRouter.get("/all", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectResult = await projectService.getAllProjects();
    
        sendResponse(projectResult, res, next);
    }
    catch (err) {
        next(err);
    }    
});

// get one project
projectRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectId = req.params.id;
        const projectResult = await projectService.getProject(projectId);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// create new project
projectRouter.post("/create", 
    RequestValidator.validate(ProjectRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const createProjectObjectDto = plainToInstance(ProjectRequestDto, bodyJson);
        const projectResult = await projectService.createProject(createProjectObjectDto);
        
        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// update project
projectRouter.put("/:id",
    RequestValidator.validate(ProjectRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const projectId = req.params.id;
        const updateProjectObjectDto = plainToInstance(ProjectRequestDto, bodyJson);
        const projectResult = await projectService.updateProject(projectId, updateProjectObjectDto);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// delete project
projectRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectId = req.params.id;
        const projectResult = await projectService.deleteProject(projectId);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// get all group tasks of a project
projectRouter.get("/:id/group-tasks", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectId = req.params.id;
        const projectResult = await projectService.getGroupTasksInProject(projectId);
        
        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// update Project name
projectRouter.put("/:id/update-name", 
    RequestValidator.validate(updateNameRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;
        
        const projectId = req.params.id;
        const name = bodyJson.newName;
        console.log(name);
        console.log(projectId);
        const projectResult = await projectService.updateProjectName(projectId, name);

        sendResponse(projectResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update Project color
projectRouter.put("/:id/update-color",
    RequestValidator.validate(UpdateColorDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const projectId = req.params.id;
        const color = bodyJson.color;
        const projectResult = await projectService.updateProjectColor(projectId, color);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});
