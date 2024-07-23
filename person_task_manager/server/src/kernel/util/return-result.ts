import { NextFunction, Response } from "express";
import { msg400, sendResponse } from "../../core/common/response-helpers";

export function returnResult(result: any, errorMessage: string, res: Response, next: NextFunction) {
    if (result) {
        sendResponse(result, res, next);
    } else {
        sendResponse(msg400(errorMessage), res, next);
    }
}
