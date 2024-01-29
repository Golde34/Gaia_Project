import { NextFunction, Response } from "express";
import { IResponse } from "./response";
import { BadRequestError, ForbiddenError, InternalServerError, NotFoundError, UnauthorizedError } from "./error-handler";

export function msg400(message: string): IResponse {
    return {
        status: false,
        statusCode: 400,
        message: message,
    };
}

export function msg401(message: string): IResponse {
    return {
        status: false,
        statusCode: 401,
        message: message,
    };
}

export function msg403(message: string): IResponse {
    return {
        status: false,
        statusCode: 403,
        message: message,
    };
}

export function msg404(message: string): IResponse {
    return {
        status: false,
        statusCode: 404,
        message: message,
    };
}

export function msg500(message: string): IResponse {
    return {
        status: false,
        statusCode: 500,
        message: message,
    };
}

export function msg200(data: any): IResponse {
    return {
        status: true,
        statusCode: 200,
        message: data,
    };
}

export function sendResponse(result: IResponse, response: Response, next: NextFunction): void {
    try {
        switch (result.statusCode) {
            case 200: {
                response.status(200).send(result);
                break;
            }
            case 400: {
                next(new BadRequestError(result.message));
                break;
            }
            case 401: {
                next(new UnauthorizedError(result.message));
                break;
            }
            case 403: {
                next(new ForbiddenError(result.message));
                break;
            }
            case 404: {
                next(new NotFoundError(result.message));
                break;
            }
            case 500: {
                next(new InternalServerError(result.message));
                break;
            }
        }
    } catch (err) {
        next(err);
    }
}