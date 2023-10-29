import { Router } from "express";
import { subTaskService } from "../services/sub-task.service";
import { sendResponse } from "../../../common/response_helpers";

export const subTaskRouter = Router();

// get one sub task
subTaskRouter.get("/:id", async (req, res, next) => {
    try {
        const subTaskId = req.params.id;
        const subTaskResult = await subTaskService.getSubTask(subTaskId);

        sendResponse(subTaskResult, res, next);
    } catch (err) {
        next(err);
    }
});

// create sub task
subTaskRouter.post("/create", async (req, res, next) => {
    try {
        const subTask = req.body;
        const taskId = req.body.taskId;
        const subTaskResult = await subTaskService.createSubTask(subTask, taskId);

        sendResponse(subTaskResult, res, next);
    } catch (err) {
        next(err);
    }
});

// update sub task
subTaskRouter.put("/:id", async (req, res, next) => {
    try {
        const subTaskId = req.params.id;
        const subTask = req.body;
        const subTaskResult = await subTaskService.updateSubTask(subTaskId, subTask);

        sendResponse(subTaskResult, res, next);
    } catch (err) {
        next(err);
    }
});

// delete sub task
subTaskRouter.delete("/:id", async (req, res, next) => {
    try {
        const subTaskId = req.params.id;
        const subTaskResult = await subTaskService.deleteSubTask(subTaskId);

        sendResponse(subTaskResult, res, next);
    } catch (err) {
        next(err);
    }
});