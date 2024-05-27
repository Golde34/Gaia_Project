import { userRepository } from "../../infrastructure/repository/user.repository";
import { IResponse, msg200, msg400, msg500 } from "../common/response";

class UserService {
    constructor() { }

    async createuser(user: any): Promise<IResponse> {
        try {
            const createuser = await userRepository.createScheduleUser(user);
            return msg200({
                message: (createuser as any)
            });
        } catch (error: any) {
            return msg500(error.message.toString());
        }
    }

    async updateuser(userId: string, user: any): Promise<IResponse> {
        try {
            const updateuser = await userRepository.updateScheduleUser(userId, user);
            return msg200({
                message: (updateuser as any)
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async deleteuser(userId: string): Promise<IResponse> {
        try {
            const deleteuser = await userRepository.deleteScheduleUser(userId);
            return msg200({
                message: (deleteuser as any)
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async finduserById(userId: string): Promise<IResponse> {
        try {
            const user = await userRepository.findScheduleUserById(userId);
            return msg200({
                user: user
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }
}

export const userService = new UserService(); 