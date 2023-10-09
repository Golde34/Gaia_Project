import { NextFunction, Request, Response, Router } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../common/response_helpers";

export const authRouter = Router();

authRouter.get("/test", async (req: Request, res: Response, next: NextFunction) => {
    const authenticated = await authService.test(req.headers.authorization?.split(" ")[1] || "");
    console.log("authen: " + authenticated);
    sendResponse(authenticated, res, next);
});

