import { NextFunction, Request } from "express";
import { groupTaskService } from "../../core/services/group-task.service";
import { IResponse } from "../../core/common/response";
import { plainToInstance } from "class-transformer";
import { GroupTaskRequestDto } from "../../core/domain/dtos/group-task.dto";
import { projectService } from "../../core/services/project.service";
import { EXCEPTION_PREFIX, PROJECT_EXCEPTION, PROJECT_NOT_FOUND } from "../../core/domain/constants/error.constant";
import { taskService } from "../../core/services/task.service";

class GroupTaskController {

    constructor() {}

    async getGrouptaskById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const groupTaskId = req.params.id;
            const groupTaskResult = await groupTaskService.getGroupTask(groupTaskId);
            
            return groupTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async createGroupTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;

            const createGroupTaskObjectDto = plainToInstance(GroupTaskRequestDto, bodyJson);
            const projectId = bodyJson.projectId;
            const groupTaskResult = await groupTaskService.createGroupTaskToProject(createGroupTaskObjectDto, projectId);
           
            return groupTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async updateGroupTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;

            const groupTaskId = req.params.id;
            const groupTask = plainToInstance(GroupTaskRequestDto, bodyJson);
            const groupTaskResult = await groupTaskService.updateGroupTask(groupTaskId, groupTask);
            
            return groupTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async deleteGroupTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const groupTaskId = req.params.id;
            const projectFindByGroupTaskId = await projectService.getProjectByGroupTaskId(groupTaskId);
            if (projectFindByGroupTaskId === PROJECT_NOT_FOUND || projectFindByGroupTaskId === EXCEPTION_PREFIX+PROJECT_EXCEPTION) {
                next(new Error(PROJECT_NOT_FOUND));
            }
            const groupTaskResult = await groupTaskService.deleteGroupTask(groupTaskId, projectFindByGroupTaskId);

            return groupTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async getTasksByGroupTaskId(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const groupTaskId = req.params.id;
            const tasksResult = await taskService.getTaskDashboard(groupTaskId);

            return tasksResult;
        } catch (err) {
            next(err);
        }
    }

    async updateGroupTaskName(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;

            const groupTaskId = req.params.id;
            const groupTaskName = bodyJson.newName;
            const groupTaskResult = await groupTaskService.updateGroupTaskName(groupTaskId, groupTaskName);

            return groupTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async calculateTotalTasks(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const groupTaskId = req.params.id;
            const totalTasksResult = await groupTaskService.calculateTotalTasks(groupTaskId);

            return totalTasksResult;
        } catch (err) {
            next(err);
        }
    }

    async updateOrdinalNumber(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body.body;

            const groupTaskId = req.params.id;
            const projectId = bodyJson.projectId;
            const groupTaskResult = await groupTaskService.updateOrdinalNumber(projectId, groupTaskId);

            return groupTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async archiveGroupTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const groupTaskId = req.params.id;
            const groupTaskResult = await groupTaskService.archiveGroupTask(groupTaskId);

            return groupTaskResult;
        } catch (err) {
            next(err);
        }
    }

    async enableGroupTask(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const groupTaskId = req.params.id;
            const groupTaskResult = await groupTaskService.enableGroupTask(groupTaskId);

            return groupTaskResult;
        } catch (err) {
            next(err);
        }
    }
}

export const groupTaskController = new GroupTaskController();