import { NextFunction, Request } from "express";
import { IResponse } from "../../../core/common/response";
import { projectCommitUsecase } from "../../../core/usecase/project-commit.usecase";

class ProjectCommitController {
    constructor() {}

    async getRepoGithubInfo(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = Number(req.params.userId);
            const projectGithubInfo = await projectCommitUsecase.getRepoGithubInfo(userId);
            return projectGithubInfo;
        } catch (err) {
            next(err);
        }
    }

    async syncProjectRepo(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const body = req.body;
            const syncResult = await projectCommitUsecase.syncProjectRepo(body);
            return syncResult;
        } catch (err) {
            next(err);
        }
    }

    async getProjectCommits(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = Number(req.params.userId);
            const projectCommits = await projectCommitUsecase.getProjectCommits(userId);
            return projectCommits;
        } catch (err) {
            next(err);
        }
    }
}

export const projectCommitController = new ProjectCommitController();