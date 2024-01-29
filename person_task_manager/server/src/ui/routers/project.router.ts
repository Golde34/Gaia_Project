import { NextFunction, Request, Response, Router } from "express";
import { sendResponse } from "../../core/common/response_helpers";
import { RequestValidator } from "../../core/common/error-handler";
import { ProjectRequestDto, UpdateColorDto } from "../../core/domain/dtos/project.dto";
import { updateNameRequestDto } from "../../core/domain/dtos/request_dtos/update-name-request.dto";
import { projectController } from "../controllers/project.controller";
import { msg400 } from "../../core/common/response_helpers";

export const projectRouter = Router();

const projectControllerImpl = projectController;

// list all projects of the user
projectRouter.get("/all", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectResult = await projectControllerImpl.listAllProjects(req, next);
        if (projectResult) {
            sendResponse(projectResult, res, next);
        } else { 
            sendResponse(msg400("No projects found"), res, next);
        }
    }
    catch (err) {
        next(err);
    }    
});

// get one project
projectRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectResult = await projectControllerImpl.getProjectById(req, next);
        if (projectResult) {
            sendResponse(projectResult, res, next);
        } else {
            sendResponse(msg400("Project not found"), res, next);
        }
    } catch (err) {
        next(err);
    }
});

// create new project
projectRouter.post("/create", 
    RequestValidator.validate(ProjectRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectResult = await projectControllerImpl.createProject(req, next);
        if (projectResult) {
            sendResponse(projectResult, res, next);
        } else {
            sendResponse(msg400("Project not created"), res, next);
        }
    } catch (err) {
        next(err);
    }
});

// update project
projectRouter.put("/:id",
    RequestValidator.validate(ProjectRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectResult = await projectControllerImpl.updateProject(req, next);
        if (projectResult) {
            sendResponse(projectResult, res, next);
        } else {
            sendResponse(msg400("Project not updated"), res, next);
        }
    } catch (err) {
        next(err);
    }
});

// delete project
projectRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectResult = await projectControllerImpl.deleteProject(req, next);
        if (projectResult) {
            sendResponse(projectResult, res, next);
        } else {
            sendResponse(msg400("Project not deleted"), res, next);
        }
    } catch (err) {
        next(err);
    }
});

// get all group tasks of a project
projectRouter.get("/:id/group-tasks", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectResult = await projectControllerImpl.getGroupTasksInProject(req, next);
        if (projectResult) {
            sendResponse(projectResult, res, next);
        } else {
            sendResponse(msg400("No group tasks found"), res, next);
        }
    } catch (err) {
        next(err);
    }
});

// update Project name
projectRouter.put("/:id/update-name", 
    RequestValidator.validate(updateNameRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projecResult = await projectControllerImpl.updateProjectName(req, next);
        if (projecResult) {
            sendResponse(projecResult, res, next);
        } else {
            sendResponse(msg400("Project name not updated"), res, next);
        }
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
        const projecResult = await projectControllerImpl.updateProjectColor(req, next);
        if (projecResult) {
            sendResponse(projecResult, res, next);
        } else {
            sendResponse(msg400("Project color not updated"), res, next);
        }
    } catch (err) {
        next(err);
    }
});
