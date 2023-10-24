import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../common/error-handler";
import { authService } from "./auth.service";
import NodeCache from "node-cache";

const cache = new NodeCache();

export const checkToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        next(new UnauthorizedError("Authorization header is missing"));
        return;
    }

    const token = req.headers.authorization.split(" ")[1];

    const startTime = performance.now();

    const cachedResult: any = cache.get(token);
    if (cachedResult !== undefined) {

        setTokenInCheckToken(res, cachedResult);

        let elapsedTime = performance.now() - startTime;
        console.log(`elapsedTime: ${elapsedTime} ms`);

        next();

        return;
    } else {
        const jwtPayload = (await authService.checkToken(token)) as any;
        if (!jwtPayload) {
            next(new UnauthorizedError("Invalid token"));
            return;
        }

        setTokenInCheckToken(res, jwtPayload);

        cache.set(token, jwtPayload, 60);

        let elapsedTime = performance.now() - startTime;
        console.log(`elapsedTime: ${elapsedTime} ms`);
    }
    
    next();
}

function setTokenInCheckToken(res: Response, data: { id: string, username: string, accessToken: string }): void {
    const { id, username, accessToken } = data;
    res.setHeader('accessToken', accessToken);
    res['locals'].username = username;
    res['locals'].id = id;
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
