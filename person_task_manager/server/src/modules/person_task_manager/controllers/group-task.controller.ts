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

// get all group tasks
groupTaskRouter.get("/all", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskResult = await groupTaskService.getAllGroupTasks();

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// create group task
groupTaskRouter.post("/create", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTask = {
            title: "New Group Task",
            description: "This is a new group task",
            priority: ["High"],
            status: "Open",
            tasks: [],
        }
        const groupTaskResult = await groupTaskService.createGroupTask(groupTask);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});