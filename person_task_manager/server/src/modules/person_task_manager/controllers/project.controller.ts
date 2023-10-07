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