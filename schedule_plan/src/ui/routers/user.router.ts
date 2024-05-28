import { NextFunction, Request, Response, Router } from "express";
import { userController } from "../controllers/user.controller";
import { RequestValidator } from "../../core/common/request_validator";
import { UserDTO } from "../../core/domain/request/user.dto";
import { returnResult } from "../../kernel/utils/return-result";

export const userRouter = Router();

const userControllerImpl = userController;

userRouter.get("/create",
    RequestValidator.validate(UserDTO),
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userResult = await userControllerImpl.createScheduleUser(req, next);
            return returnResult(userResult, "FAIL", res, next);
        } catch (error) {
            next(error);
        }
    }
);