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

    async findByUserId(userId: number): Promise<UserCommitEntity[]> {
        const query = `SELECT * FROM ${this.tableName} WHERE userId = ?`;
        const [rows] = await this.pool.query(query, [userId]);
        return rows as UserCommitEntity[];
    }
}

export default UserCommitRepository;