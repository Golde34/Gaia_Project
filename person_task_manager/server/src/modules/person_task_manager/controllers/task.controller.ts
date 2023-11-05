import {type Request, type Response, Router, NextFunction} from "express";
import { taskService } from "../services/task.service";
import { sendResponse } from "../../../common/response_helpers";
import { checkPermission, checkToken } from "../../user_authentication/auth.middleware";
import { Permission } from "../../../loaders/enums";

export const taskRouter = Router();

// get all tasks - this function is for boss only
taskRouter.get("/", 
    checkToken,
    checkPermission(Permission.readTask), 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskResult = await taskService.getAllTasks();

        sendResponse(taskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

//get one task
taskRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = req.params.id;
        const taskResult = await taskService.getTask(taskId);

        sendResponse(taskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// create task
taskRouter.post("/create", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const task = req.body;
        const groupTaskId = req.body.groupTaskId;
        const taskResult = await taskService.createTaskInGroupTask(task, groupTaskId);

        sendResponse(taskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update task
taskRouter.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = req.params.id;
        const task = req.body;
        const taskResult = await taskService.updateTask(taskId, task);

        sendResponse(taskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// delete task
taskRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = req.params.id;
        const taskResult = await taskService.deleteTask(taskId);

        sendResponse(taskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// get subtasks of a task
taskRouter.get("/:id/sub-tasks", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = req.params.id;
        const subTaskResult = await taskService.getSubTasksInTask(taskId);

        sendResponse(subTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// get comments of a task
taskRouter.get("/:id/comments", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskId = req.params.id;
        const commentResult = await taskService.getCommentsInTask(taskId);

        sendResponse(commentResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// create subtask

// update subtask

// delete subtask

// get task history

// create task history

// update task history

// delete task history

// get task comments

// create task comment

// update task comment

// delete task comment

// get task attachments

// create task attachment

// update task attachment

// delete task attachment
