import { NextFunction, Response } from "express";
import { msg400, sendResponse } from "../../core/common/response_helpers";

export function returnResult(projectResult: any, errorMessage: string, res: Response, next: NextFunction) {
    if (projectResult) {
        sendResponse(projectResult, res, next);
    } else {
        sendResponse(msg400(errorMessage), res, next);
    }
}
