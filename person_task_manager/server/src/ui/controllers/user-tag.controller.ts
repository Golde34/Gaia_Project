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

    async updateUserTag(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const tagId = req.params.id;
            const bodyJson = req.body;
            const userTagResult = await userTagService.updateUserTag(tagId, bodyJson);

            return userTagResult;
        } catch (err) {
            next(err);
        }
    }

    async deleteUserTag(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const tagId = req.params.id;
            const userTagResult = await userTagService.deleteUserTag(tagId);

            return userTagResult;
        } catch (err) {
            next(err);
        }
    }

    async findUserTag(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const tagId = req.params.id;
            const userTagResult = await userTagService.findUserTag(tagId);

            return userTagResult;
        } catch (err) {
            next(err);
        }
    }

    async archiveUserTag(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const tagId = req.params.id;
            const userTagResult = await userTagService.archiveTag(tagId);

            return userTagResult;
        } catch (err) {
            next(err);
        }
    }

    async enableUserTag(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const tagId = req.params.id;
            const userTagResult = await userTagService.enableTag(tagId);

            return userTagResult;
        } catch (err) {
            next(err);
        }
    }
}

export const userTagController = new UserTagController();