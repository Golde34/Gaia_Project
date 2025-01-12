import UserCommitRepository from "../../infrastructure/repository/user-commit.repository";

class UserCommitService {
    constructor(
        private userCommitRepository: UserCommitRepository = UserCommitRepository.getInstance() 
    ) {}

    async getUserGithubInfo(userId: number): Promise<any> {
        try {
            const userGithubInfo = await this.userCommitRepository.findByUserId(userId);
            return userGithubInfo; 
        } catch (error) {
            console.error("Error on getUserGithubInfo: ", error);
            return null;
        }
    }
}

export const userCommitService = new UserCommitService();