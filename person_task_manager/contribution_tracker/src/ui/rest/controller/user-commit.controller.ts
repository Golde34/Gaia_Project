import { NextFunction, Request } from "express";
import { IResponse } from "../../../core/common/response";
import { userCommitUsecase } from "../../../core/usecase/user-commit.usecase";

class UserCommitController {
    constructor() {}

    async getUserGithubInfo(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = Number(req.params.userId);
            const userGithubInfo = await userCommitUsecase.getUserGithubInfo(userId);
            return userGithubInfo;
        } catch (err) {
            next(err);
        }
    }
}

export const userCommitController = new UserCommitController();