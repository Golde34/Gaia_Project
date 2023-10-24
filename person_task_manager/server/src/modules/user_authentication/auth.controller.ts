import { NextFunction, Request, Response, Router } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../common/response_helpers";
import { checkToken } from "./auth.middleware";
// import { checkToken } from "./auth.middleware";

export const authRouter = Router();

authRouter.get("/test",
    checkToken,
    async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const authenticated = await authService.test(token);
    console.log("authen: " + authenticated);
    sendResponse(authenticated, res, next);
});

authRouter.get("/check-token",
    checkToken,
    async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const authenticated = await authService.checkToken(token);
    console.log("authen: " + authenticated);
    sendResponse(authenticated, res, next);
});

// authRouter.get("/get-user-information", async (req: Request, res: Response, next: NextFunction) => {
//     const userInformation = await checkToken(req, res, next);
//     console.log("userInformation: " + userInformation);
//     return userInformation;
// });