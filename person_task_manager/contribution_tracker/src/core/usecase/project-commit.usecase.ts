import { msg200, msg400 } from "../common/response-helpers";
import { githubRepoMapper } from "../mapper/project-commit.mapper";
import { userCommitService } from "../service/user-commit.service";

class ProjectCommitUsecase {
    constructor(
        private userCommitServiceImpl = userCommitService,
    ) { }

    async getRepoGithubInfo(userId: number): Promise<any> {
        try {
            const user = await this.userCommitServiceImpl.getUserGithubInfo(userId);
            const repos = await this.userCommitServiceImpl.getUserGithubRepo(user);
            const githubRepos = repos.map((repo: any) => githubRepoMapper(repo));
            return msg200({
                githubRepos
            });
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }
}

export const projectCommitUsecase = new ProjectCommitUsecase();