import { msg200, msg400 } from "../common/response-helpers";
import { SyncProjectRepoDto } from "../domain/dtos/github-object.dto";
import { githubRepoMapper, syncProjectRepoMapper } from "../mapper/project-commit.mapper";
import { projectCommitService } from "../service/project-commit.service";
import { userCommitService } from "../service/user-commit.service";

class ProjectCommitUsecase {
    constructor(
        private userCommitServiceImpl = userCommitService,
        private projectCommitServiceImpl = projectCommitService,
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

    async syncProjectRepo(body: any): Promise<any> {
        try {
            const request: SyncProjectRepoDto = syncProjectRepoMapper(body);
            return await this.projectCommitServiceImpl.syncProjectRepo(request); 
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }
}

export const projectCommitUsecase = new ProjectCommitUsecase();