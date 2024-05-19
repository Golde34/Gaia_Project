import { NextFunction, type Request, Router, Response } from "express";
import { userTagController } from "../controllers/user-tag.controller";
import { returnResult } from "../../kernel/util/return-result";
import { USER_TAG_NOT_FOUND } from "../../core/domain/constants/error.constant";

export const userTagRouter = Router();

const userTagControllerImpl = userTagController;

// userTagRouter.get("/tag-list-of-user", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const userTagListResult = await userTagControllerImpl.getUserTagListOfUser(req, next);
//         returnResult(userTagListResult, USER_TAG_NOT_FOUND, res, next);
//     } catch(err) {
//         console.log(err);
//         next(err);
//     }
// })

userTagRouter.post("/create-user-tag", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userTagResult = await userTagControllerImpl.createUserTag(req, next);
        returnResult(userTagResult, USER_TAG_NOT_FOUND, res, next);
    } catch(err) {
        console.log(err);
        next(err);
    }
})