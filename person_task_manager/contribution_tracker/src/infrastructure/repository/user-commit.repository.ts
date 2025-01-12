import { UserCommitEntity } from "../../core/domain/entities/user-commit.entity";
import Repository from "../database/repository";

export class UserCommitRepository extends Repository {
    private static instance: UserCommitRepository;

    public static getInstance(): UserCommitRepository {
        if (!UserCommitRepository.instance) {
            UserCommitRepository.instance = new UserCommitRepository();
        }
        return UserCommitRepository.instance;
    }

    constructor() {
        super('user_commit');
    }

    async findByUserId(userId: number): Promise<UserCommitEntity> {
        const user = await this.findByCondition('user_id = ?', [userId]);
        return user[0];
    }
}

export default UserCommitRepository;