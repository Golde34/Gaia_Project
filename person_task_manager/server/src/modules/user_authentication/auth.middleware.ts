import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../common/error-handler";
import { authService } from "./auth.service";
import * as jwt from "jsonwebtoken";
import { config } from "../../config/configuration";

// export const checkToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
//         next(new UnauthorizedError("Unauthorized"));
//         return;
//     }

//     const token = req.headers.authorization.split(" ")[1];
    
//     if (!token) {
//         next(new UnauthorizedError("Unauthorized"));
//         return;
//     }

//     // res['locals'].accountId = await authService.getInformation(token);
//     res.setHeader('access-token', token);
// }

export const checkToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        next(new UnauthorizedError("Authorization header is missing"));
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    const jwtPayload = (await authService.checkToken(token)) as any;

    if (!jwtPayload) {
        next(new UnauthorizedError("Invalid token"));
        return;
    }

    const { accessToken, refreshToken, username, name, email} = jwtPayload;
    res.setHeader('access-token', accessToken);
    res['locals'].username = jwtPayload.username;

    next();
}
