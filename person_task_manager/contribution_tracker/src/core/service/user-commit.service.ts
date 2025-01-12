class UserCommitService {
    constructor() {}

    async getUserGithubInfo(userId: number): Promise<any> {
        try {
            // const userGithubInfo = await userCommitRepository.getUserGithubInfo(userId);
            // return userGithubInfo; 
        } catch (error) {
            console.error("Error on getUserGithubInfo: ", error);
            return null;
        }
    }
}

export const userCommitService = new UserCommitService();