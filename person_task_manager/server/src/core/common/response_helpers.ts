import { NextFunction, Response } from "express";
import { IResponse } from "./response";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from "./error-handler";

export function msg400(message: string): IResponse {
    return {
        status: "error",
        statusMessage: "Bad Request",
        errorCode: 400,
        errorMessage: message,
        data: null,
    };
}

export function msg401(message: string): IResponse {
    return {
        status: "error",
        statusMessage: "Unauthorized",
        errorCode: 401,
        errorMessage: message,
        data: null,
    };
}

export function msg403(message: string): IResponse {
    return {
        status: "error",
        statusMessage: "Forbidden",
        errorCode: 403,
        errorMessage: message,
        data: null,
    };
}

export function msg404(message: string): IResponse {
    return {
        status: "error",
        statusMessage: "Not Found",
        errorCode: 404,
        errorMessage: message,
        data: null,
    };
}

export function msg500(message: string): IResponse {
    return {
        status: "error",
        statusMessage: "Internal Server Error",
        errorCode: 500,
        errorMessage: message,
        data: null,
    };
}

export function msg200(data: any): IResponse {
    return {
        status: "success",
        statusMessage: "OK",
        errorCode: 200,
        errorMessage: "",
        data: data,
    };
}

export function sendResponse(result: IResponse, response: Response, next: NextFunction): void {
    try {
        switch (result.errorCode) {
            case 200: {
                response.status(200).send(result);
                break;
            }
            case 400: {
                next(new BadRequestError(result.errorMessage));
                break;
            }
            case 401: {
                next(new UnauthorizedError(result.errorMessage));
                break;
            }
            case 403: {
                next(new ForbiddenError(result.errorMessage));
                break;
            }
            case 404: {
                next(new NotFoundError(result.errorMessage));
                break;
            }
            case 500: {
                next(new InternalServerError(result.errorMessage));
                break;
            }
        }
    } catch (err) {
        next(err);
    }
}