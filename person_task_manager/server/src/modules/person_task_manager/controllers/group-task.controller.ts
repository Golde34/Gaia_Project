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
        // const groupTask = {
        //     title: "New Group Task",
        //     description: "This is a new group task",
        //     priority: ["High"],
        //     status: "Open",
        //     tasks: [],
        // }
        const groupTask = req.body;
        const projectId = req.body.projectId;

        const groupTaskResult = await groupTaskService.createGroupTaskToProject(groupTask, projectId);
        console.log(groupTaskResult);
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

        const groupTaskResult = await groupTaskService.getTasks(groupTaskId);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});