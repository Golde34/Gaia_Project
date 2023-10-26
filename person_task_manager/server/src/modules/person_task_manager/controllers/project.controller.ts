import { Router } from "express";
import { sendResponse } from "../../../common/response_helpers";
import { projectService } from "../services/project.service";

export const projectRouter = Router();

// list all projects of the user
projectRouter.get("/all", async (req, res, next) => {
    try {
        const projectResult = await projectService.getAllProjects();
    
        sendResponse(projectResult, res, next);
    }
    catch (err) {
        next(err);
    }    
});

// get one project
projectRouter.get("/:id", async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const projectResult = await projectService.getProject(projectId);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// create new project
projectRouter.post("/create", async (req, res, next) => {
    try {
        const data = req.body;
        const projectResult = await projectService.createProject(data);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// update project
projectRouter.put("/:id", async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const data = req.body;
        const projectResult = await projectService.updateProject(projectId, data);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// delete project
projectRouter.delete("/:id", async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const projectResult = await projectService.deleteProject(projectId);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});

// get all group tasks of a project
projectRouter.get("/:id/group-tasks", async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const projectResult = await projectService.getGroupTasks(projectId);

        sendResponse(projectResult, res, next);
    } catch (err) {
        next(err);
    }
});


