import { type Request, type Response, Router, NextFunction } from "express";
import { taskService } from "../services/task.service";
import { sendResponse } from "../../../common/response_helpers";
import { checkPermission, checkToken } from "../../user_authentication/auth.middleware";
import { Permission } from "../../../loaders/enums";
import { plainToInstance } from "class-transformer";
import { RequestValidator } from "../../../common/error-handler";
import { GenerateTaskFromScratchRequestDTO, TaskRequestDto, UpdaetTaskInDialogDTO } from "../dtos/task.dto";
import { groupTaskService } from "../services/group-task.service";

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
taskRouter.post("/create",
    RequestValidator.validate(TaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bodyJson = req.body.body;

            const createTaskObjectDto = plainToInstance(TaskRequestDto, bodyJson);
            const groupTaskId = bodyJson.groupTaskId;
            const taskResult = await taskService.createTaskInGroupTask(createTaskObjectDto, groupTaskId);

            sendResponse(taskResult, res, next);
        }
        catch (err) {
            next(err);
        }
    });

// update task
taskRouter.put("/:id",
    RequestValidator.validate(TaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bodyJson = req.body.body;

            const taskId = req.params.id;
            const updateTaskObjectDto = plainToInstance(TaskRequestDto, bodyJson);
            const taskResult = await taskService.updateTask(taskId, updateTaskObjectDto);

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
        const groupTaskByTaskId = await groupTaskService.getGroupTaskByTaskId(taskId);
        if (groupTaskByTaskId === 'error' || groupTaskByTaskId === 'Group Task not found') {
            next(new Error("Group Task is undefined"));
        }
        const taskResult = await taskService.deleteTask(taskId, groupTaskByTaskId);

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

// generate task from scratch
taskRouter.post("/generate",
    RequestValidator.validate(GenerateTaskFromScratchRequestDTO),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bodyJson = req.body.body;

            const task = plainToInstance(TaskRequestDto, bodyJson);
            const projectId = bodyJson.projectId;
            // geneate new group task contains created task
            let groupTask = {
                title: task.title,
                description: task.description,
                status: task.status,
                ordinalNumber: 1,
            }

            let groupTaskCreate;
            if (projectId) {
                groupTaskCreate = await groupTaskService.createGroupTaskFromTask(groupTask, projectId);
            } else {
                next(new Error("projectId is undefined"));
            }

            if (groupTaskCreate !== undefined) {
                const taskCreate = await taskService.createTaskInGroupTask(task, groupTaskCreate);
                sendResponse(taskCreate, res, next);
            }
        }
        catch (err) {
            next(err);
        }
    });

// update task in dialog
taskRouter.put("/update-task-in-dialog/:id",
    RequestValidator.validate(UpdaetTaskInDialogDTO),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bodyJson = req.body.body;

            const task = plainToInstance(UpdaetTaskInDialogDTO, bodyJson);
            const taskId = req.params.id;

            const taskResult = await taskService.updateTaskInDialog(taskId, task);
            sendResponse(taskResult, res, next);
        } catch (err) {
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
