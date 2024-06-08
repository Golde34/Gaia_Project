import { NextFunction, Response } from "express";

export interface IResponse {
    status: string;
    statusMessage: string;
    errorCode: number;
    errorMessage: string;
    data: any;
}

export function msg400(message: string): IResponse {
    return {
        status: 'error',
        statusMessage: 'Bad Request',
        errorCode: 400,
        errorMessage: message,
        data: null,
    }
}

export function msg401(message: string): IResponse {
    return {
        status: 'error',
        statusMessage: 'Unauthorized',
        errorCode: 401,
        errorMessage: message,
        data: null,
    }
}

export function msg403(message: string): IResponse {
    return {
        status: 'error',
        statusMessage: 'Forbidden',
        errorCode: 403,
        errorMessage: message,
        data: null,
    }
}

export function msg404(message: string): IResponse {
    return {
        status: 'error',
        statusMessage: 'Not Found',
        errorCode: 404,
        errorMessage: message,
        data: null,
    }
}

export function msg405(message: string): IResponse {
    return {
        status: 'error',
        statusMessage: 'Method Not Allowed',
        errorCode: 405,
        errorMessage: message,
        data: null,
    }
}

export function msg500(message: string): IResponse {
    return {
        status: 'error',
        statusMessage: 'Internal Server Error',
        errorCode: 500,
        errorMessage: message,
        data: null,
    }
}

export function msg200(data: any): IResponse {
    return {
        status: 'success',
        statusMessage: 'OK',
        errorCode: 200,
        errorMessage: '',
        data: data,
    }
}

export function sendResponse(result: IResponse, response: Response, next: NextFunction): void {
    try {
        response.status(result.errorCode).json(result);
    } catch (error) {
        next(error);
    }
}