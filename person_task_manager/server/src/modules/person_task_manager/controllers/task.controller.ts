import {type Request, type Response, Router, NextFunction} from "express";
import { taskService } from "../services/task.service";
import { sendResponse } from "../../../common/helpers";

export const taskRouter = Router();

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

// get all tasks
taskRouter.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskResult = await taskService.getAllTasks();

        res.status(200).send(taskResult);
    }
    catch (err) {
        next(err);
    }
});

// create task
taskRouter.post("/task/create", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const task = {
            title: "New Task",
            description: "This is a new task",
            priority: ["High"],
            status: "Open",
            createdAt: new Date(),
            updatedAt: new Date(),
            subTasks: [],
        }
        const taskResult = await taskService.createTask(task);

        sendResponse(taskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});
// update task

// delete task

// get subtasks

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

