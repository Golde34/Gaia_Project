import { NextFunction, type Request, Router, Response } from "express";
import { userTagController } from "../controllers/user-tag.controller";
import { returnResult } from "../../kernel/util/return-result";
import { ARCHIVE_USER_TAG_FAILED, CREATE_USER_TAG_FAILED, DELETE_USER_TAG_FAILED, ENABLE_USER_TAG_FAILED, UPDATE_USER_TAG_FAILED, USER_TAG_NOT_FOUND } from "../../core/domain/constants/error.constant";

export const userTagRouter = Router();

const userTagControllerImpl = userTagController;

userTagRouter.post("/create", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userTagResult = await userTagControllerImpl.createUserTag(req, next);
        return returnResult(userTagResult, CREATE_USER_TAG_FAILED, res, next);
    } catch(err) {
        console.log(err);
        next(err);
    }
});

userTagRouter.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userTagResult = await userTagControllerImpl.updateUserTag(req, next);
        return returnResult(userTagResult, UPDATE_USER_TAG_FAILED, res, next);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

userTagRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userTagResult = await userTagControllerImpl.deleteUserTag(req, next);
        return returnResult(userTagResult, DELETE_USER_TAG_FAILED, res, next);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

userTagRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userTagResult = await  userTagControllerImpl.findUserTag(req, next);
        return returnResult(userTagResult, USER_TAG_NOT_FOUND, res, next);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

userTagRouter.put("/:id/archive", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userTagResult = await userTagControllerImpl.archiveUserTag(req, next);
        return returnResult(userTagResult, ARCHIVE_USER_TAG_FAILED, res, next);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

userTagRouter.get("/:id/enable", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userTagResult = await userTagControllerImpl.enableUserTag(req, next);
        return returnResult(userTagResult, ENABLE_USER_TAG_FAILED, res, next);
    } catch (err) {
        console.log(err);
        next(err);
    }
});
