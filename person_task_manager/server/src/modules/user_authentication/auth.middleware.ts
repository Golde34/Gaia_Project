import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../common/error-handler";
import { authService } from "./auth.service";

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

    const { id, username, accessToken } = jwtPayload;
    res.setHeader('accessToken', accessToken);
    res['locals'].username = username;
    res['locals'].id = id;

    next();
}

// export const checkPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
//         next(new UnauthorizedError("Authorization header is missing"));
//         return;
//     }

//     const token = req.headers.authorization.split(" ")[1];

//     const jwtPayload = (await authService.checkToken(token)) as any;
//     if (!jwtPayload) {
//         next(new UnauthorizedError("Invalid token"));
//         return;
//     }

//     const { id, username, accessToken } = jwtPayload;
//     res.setHeader('accessToken', accessToken);
//     res['locals'].username = username;
//     res['locals'].id = id;

//     next();
// }
