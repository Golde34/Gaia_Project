import { NextFunction, Request, Response, Router } from "express";
import { projectCommitController } from "../controller/project-commit.controller";

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
