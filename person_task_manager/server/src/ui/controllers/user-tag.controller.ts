import { NextFunction, Request } from "express";
import { IResponse } from "../../core/common/response";
import { userTagService } from "../../core/services/user-tag.service";

class UserTagController {
    constructor() {}

    async createUserTag(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const bodyJson = req.body;
            const userTagResult = await userTagService.createUserTag(bodyJson);

            return userTagResult;
        } catch (err) {
            next(err);
        }
    }

}

export const userTagController = new UserTagController();