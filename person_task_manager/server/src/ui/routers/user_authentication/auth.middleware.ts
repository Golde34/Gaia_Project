import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../../core/common/error-handler";
import { authService } from "./auth.service";
import NodeCache from "node-cache";
import { Permission } from "../../../core/domain/enums/enums";
import { calculatedTimeResult } from "../../../kernel/util/performance-calculate";

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
        if (_checkInvalidToken(cachedResult)) {
            next(new UnauthorizedError("Invalid token"));
            return;
        }
        _setTokenInCheckFunc(res, cachedResult);

        console.log(calculatedTimeResult(startTime, next));

        next();

        return;
    } else {
        const jwtPayload = (await authService.checkToken(token)) as any;
        if (jwtPayload === undefined || _checkInvalidToken(jwtPayload)) {
            next(new UnauthorizedError("Invalid token"));
            return;
        }

        _setTokenInCheckFunc(res, jwtPayload);

        cache.set(token, jwtPayload, 60);

        console.log(calculatedTimeResult(startTime, next));
    }
    
    next();
}

function _checkInvalidToken(data: {id: string, username: string, accessToken: string, expiryDate: Date }): boolean {
    if (performance.now() - Number(data.expiryDate) <= 0) {
        return true;
    }
    return false;
}

function _setTokenInCheckFunc(res: Response, data: { id: string, username: string, accessToken: string, expiryDate: Date }): void {
    const { id, username, accessToken } = data;
    res.setHeader('accessToken', accessToken);
    res['locals'].username = username;
    res['locals'].id = id;
}

export const checkPermission = (requiredPermission: Permission) => 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = res['locals'].id;
        const hasPermission = await authService.checkPermission(userId, requiredPermission);
        if (!hasPermission) {
            next(new UnauthorizedError("You don't have permission"));
            return;
        }
    
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
