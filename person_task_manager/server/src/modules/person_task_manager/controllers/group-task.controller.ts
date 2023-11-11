import { NextFunction, Request, Response, Router } from "express";
import { groupTaskService } from "../services/group-task.service";
import { sendResponse } from "../../../common/response_helpers";

export const groupTaskRouter = Router();

// get one group task
groupTaskRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskId = req.params.id;        
        const groupTaskResult = await groupTaskService.getGroupTask(groupTaskId);
        
        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// create group task
groupTaskRouter.post("/create", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;
        const groupTask = bodyJson;
        const projectId = bodyJson.projectId;
        const groupTaskResult = await groupTaskService.createGroupTaskToProject(groupTask, projectId);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update group task
groupTaskRouter.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskId = req.params.id;
        const groupTask = req.body;
        const groupTaskResult = await groupTaskService.updateGroupTask(groupTaskId, groupTask);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// delete group task
groupTaskRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskId = req.params.id;
        const groupTaskResult = await groupTaskService.deleteGroupTask(groupTaskId);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// get all tasks of a group task
groupTaskRouter.get("/:id/tasks", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskId = req.params.id;
        const groupTaskResult = await groupTaskService.getTasksInGroupTask(groupTaskId);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update Group task name
groupTaskRouter.put("/:id/update-name", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;
        
        const groupTaskId = req.params.id;
        const name = bodyJson.newName;
        const groupTaskResult = await groupTaskService.updateGroupTaskName(groupTaskId, name);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});