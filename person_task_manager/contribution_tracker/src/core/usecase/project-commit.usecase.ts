import { msg200, msg400 } from "../common/response-helpers";
import { userCommitService } from "../service/user-commit.service";

class ProjectCommitUsecase {
    constructor(
        private userCommitServiceImpl = userCommitService,
    ) {}

    async getRepoGithubInfo(userId: number): Promise<any> {
        try {
            const user = await this.userCommitServiceImpl.getUserGithubInfo(userId); 
            const githubRepos = await this.userCommitServiceImpl.getUserGithubRepo(user);
            return msg200({
                githubRepos
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    } 
}

export const projectCommitUsecase = new ProjectCommitUsecase();