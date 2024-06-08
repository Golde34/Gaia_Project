import { UpdateWriteOpResult } from "mongoose";
import { IUserEntity, UserEntity } from "../entities/user.entity";
import { DeleteResult } from "mongodb";
import { UserStore } from "./store/user.store";

class UserRepository implements UserStore {
    constructor() {}

    async createScheduleUser(user: any): Promise<IUserEntity> {
        return await UserEntity.create(user);
    }

    async updateScheduleUser(userId: string, user: any): Promise<UpdateWriteOpResult> {
        return await UserEntity.updateOne({ _id: userId }, user);
    }

    async deleteScheduleUser(userId: string): Promise<DeleteResult> {
        return await UserEntity.deleteOne({ _id: userId });
    }

    async findScheduleUserById(userId: string): Promise<IUserEntity | null> {
        return await UserEntity.findOne({ _id: userId });
    }   
}

export const userRepository = new UserRepository();