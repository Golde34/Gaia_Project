import { NextFunction, Request, Response, Router } from "express";
import { groupTaskService } from "../services/group-task.service";
import { sendResponse } from "../../../common/response_helpers";
import { RequestValidator } from "../../../common/error-handler";
import { GroupTaskRequestDto, updateGroupTaskNameRequestDto } from "../dtos/group-task.dto";
import { plainToInstance } from "class-transformer";

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
groupTaskRouter.post("/create",
    RequestValidator.validate(GroupTaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const createGroupTaskObjectDto = plainToInstance(GroupTaskRequestDto, bodyJson);
        const projectId = bodyJson.projectId;
        const groupTaskResult = await groupTaskService.createGroupTaskToProject(createGroupTaskObjectDto, projectId);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update group task
groupTaskRouter.put("/:id", 
    RequestValidator.validate(GroupTaskRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const groupTaskId = req.params.id;
        const groupTask = plainToInstance(GroupTaskRequestDto, bodyJson);
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
groupTaskRouter.put("/:id/update-name", 
    RequestValidator.validate(updateGroupTaskNameRequestDto),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

// calculate total tasks and total tasks completed
groupTaskRouter.put("/:id/calculate-total-tasks", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groupTaskId = req.params.id;
        const groupTaskResult = await groupTaskService.calculateTotalTasks(groupTaskId);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});

// update ordinal number
groupTaskRouter.put("/:id/update-ordinal-number", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const bodyJson = req.body.body;

        const projectId = bodyJson.projectId;
        const groupTaskId = req.params.id;
        const groupTaskResult = await groupTaskService.updateOrdinalNumber(projectId, groupTaskId);

        sendResponse(groupTaskResult, res, next);
    }
    catch (err) {
        next(err);
    }
});