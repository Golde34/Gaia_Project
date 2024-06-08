import { type Request, type Response, Router, NextFunction } from "express";
import { checkPermission, checkToken } from "./user_authentication/auth.middleware";
import { Permission } from "../../core/domain/enums/enums";
import { RequestValidator } from "../../core/common/error-handler";
import { GenerateTaskFromScratchRequestDTO, TaskRequestDto, UpdateTaskInDialogDTO } from "../../core/domain/dtos/task.dto";
import { taskController } from "../controllers/task.controller";
import { ARCHIVE_TASK_FAILED, COMMENT_NOT_FOUND, CREATE_TASK_FAILED, DELETE_TASK_FAILED, ENABLE_TASK_FAILED, SUB_TASK_NOT_FOUND, TASK_NOT_FOUND, UPDATE_TASK_FAILED } from "../../core/domain/constants/error.constant";
import { returnResult } from "../../kernel/util/return-result";

export const taskRouter = Router();

const taskControllerImpl = taskController;

// get all tasks - this function is for boss only
taskRouter.get("/",
    checkToken,
    checkPermission(Permission.readTask),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const taskResult = await taskControllerImpl.getAllTasks(req, next);
            returnResult(taskResult, TASK_NOT_FOUND, res, next);
        }
        catch (err) {
            next(err);
        }
    });

//get one task
taskRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskResult = await taskControllerImpl.getTask(req, next);
        return returnResult(taskResult, TASK_NOT_FOUND, res, next);
    }
    catch (err) {
        next(err);
    }
});

// create task
taskRouter.post("/create",
    RequestValidator.validateV2(TaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const taskResult = await taskControllerImpl.createTask(req, next);
            return returnResult(taskResult, CREATE_TASK_FAILED, res, next);
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
            const taskResult = await taskControllerImpl.updateTask(req, next);
            return returnResult(taskResult, UPDATE_TASK_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

// delete task
taskRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskResult = await taskControllerImpl.deleteTask(req, next);
        return returnResult(taskResult, DELETE_TASK_FAILED, res, next);
    }
    catch (err) {
        next(err);
    }
});

// get subtasks of a task
taskRouter.get("/:id/sub-tasks", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const subTaskResult = await taskControllerImpl.getSubTasksByTaskId(req, next);
        return returnResult(subTaskResult, SUB_TASK_NOT_FOUND, res, next);
    }
    catch (err) {
        next(err);
    }
});

// get comments of a task
taskRouter.get("/:id/comments", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const commentResult = await taskControllerImpl.getCommentsByTaskId(req, next);
        return returnResult(commentResult, COMMENT_NOT_FOUND, res, next);
    }
    catch (err) {
        next(err);
    }
});

// generate task from scratch
taskRouter.post("/generate",
    RequestValidator.validateV2(GenerateTaskFromScratchRequestDTO),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const taskResult = await taskControllerImpl.generateTaskWithoutGroupTask(req, next);
            return returnResult(taskResult, CREATE_TASK_FAILED, res, next);
        }
        catch (err) {
            next(err);
        }
    });

// update task in dialog
taskRouter.put("/:id/update-task-in-dialog",
    RequestValidator.validateV2(UpdateTaskInDialogDTO),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const taskResult = await taskControllerImpl.updateTaskInDialog(req, next);
            return returnResult(taskResult, UPDATE_TASK_FAILED, res, next);
        } catch (err) {
            next(err);
        }
    });

// move task to another group task
taskRouter.put("/:id/move-task",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await taskControllerImpl.moveTaskToAnotherGroupTask(req, next);
            return returnResult(result, UPDATE_TASK_FAILED, res, next);
        } catch (err) {
            next(err);
        }
    });

// archive task
taskRouter.put("/:id/archive", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskResult = await taskControllerImpl.archiveTask(req, next);
        return returnResult(taskResult, ARCHIVE_TASK_FAILED, res, next);
    } catch (err) {
        next(err);
    }
});

// enable task
taskRouter.put("/:id/enable", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const taskResult = await taskControllerImpl.enableTask(req, next);
        return returnResult(taskResult, ENABLE_TASK_FAILED, res, next);
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
