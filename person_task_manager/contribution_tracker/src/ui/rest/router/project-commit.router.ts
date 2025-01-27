import { NextFunction, Request, Response, Router } from "express";
import { projectCommitController } from "../controller/project-commit.controller";
import { returnResult } from "../../../kernel/util/return-result";
import { INTERNAL_SERVER_ERROR } from "../../../core/domain/constants/error.constant";

export const projectCommitRouter = Router();

const projectCommitControllerImpl = projectCommitController;

projectCommitRouter.get("/get-github-repos/:userId", async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    try {
        const githubRepos = await projectCommitControllerImpl.getRepoGithubInfo(req, next);
        res.json(githubRepos);
    } catch (err) {
        next(err);
    }
})

projectCommitRouter.post("/synchronize-project-repo/:userId", async (req: Request, res:Response, next: NextFunction): Promise<void> => {
    try {
        const syncResult = await projectCommitControllerImpl.syncProjectRepo(req, next);
        returnResult(syncResult, INTERNAL_SERVER_ERROR, res, next);
    } catch (err) {
        next(err);
    }
})