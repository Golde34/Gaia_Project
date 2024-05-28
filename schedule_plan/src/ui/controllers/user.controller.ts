import { Request, Response, NextFunction } from "express";
import { IResponse } from "../../core/common/response";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "../../core/domain/request/user.dto";
import { userService } from "../../core/services/user.service";

class UserController {
    constructor() {}

    async createScheduleUser(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const user = plainToInstance(UserDTO, req.body);
            return await userService.createUser(user);
        } catch (error) {
            next(error);
        }
    }

    async updateScheduleUser(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = req.params.id;
            const user = plainToInstance(UserDTO, req.body);
            return await userService.updateUser(userId, user);
        } catch (error) {
            next(error);
        }
    }

    async deleteScheduleUser(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = req.params.id;
            return await userService.deleteUser(userId);
        } catch (error) {
            next(error);
        }
    }

    async findScheduleUserById(req: Request, next: NextFunction): Promise<IResponse | undefined> {
        try {
            const userId = req.params.id;
            return await userService.findUserById(userId);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();