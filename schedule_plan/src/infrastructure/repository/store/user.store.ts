import { UpdateWriteOpResult } from "mongoose";
import { IUserEntity } from "../../entities/user.entity";
import { DeleteResult } from "mongodb";

export interface UserStore {
    createScheduleUser(user: any): Promise<IUserEntity>;
    updateScheduleUser(userId: string, user: any): Promise<UpdateWriteOpResult>;
    deleteScheduleUser(userId: string): Promise<DeleteResult>;
    findScheduleUserById(userId: string): Promise<IUserEntity | null>;
}