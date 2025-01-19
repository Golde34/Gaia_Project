import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response-helpers";
import { commitService } from "../service/commit.service";
import { userCommitService } from "../service/user-commit.service";

class CommitUsecase {
    constructor(
        public commitServiceImpl = commitService,
        public userCommitServiceImpl = userCommitService,

    ) { }

    async getUserCommits(userId: number): Promise<IResponse> {
        try {
            const userCommits = this.commitServiceImpl.getUserCommits(userId);
            return msg200({
                userCommits
            })
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async getProjectCommits(userId: number, projectId: string): Promise<IResponse> {
        try {
            const commits = this.commitServiceImpl.getProjectCommits(userId, projectId);
            return msg200({
                commits
            })
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async createCommit(data: any): Promise<IResponse> {
        try {
            const commit = this.commitServiceImpl.createCommit(data);
            return msg200({
                commit
            })
        } catch (error: any) {
            return msg400(error.message.toString());
        }
    }

    async syncGithubCommit(data: any): Promise<void> {
        try {
            console.log("Syncing github commit message id: ", data);
            // get list user commits
            const users = await userCommitService.getUsers();
            // get list project commits
            for (const user of users) {
                const githubRepos = await userCommitService.getUserGithubRepo(user);
                for (const repo of githubRepos) {
                    if (repo.owner.login !== user.githubLoginName) {
                        continue;
                    }
                    const commits = await userCommitService.getGithubCommits(user.githubAccessToken, repo.name);
                    for (const commit of commits) {
                        if (commit.commit.committer.name !== user.githubLoginName) {
                            continue;
                        }
                        this.commitServiceImpl.syncGithubCommit(user.userId, commit);
                    }
                }
            }
            // call github api to get commit details
            // create commit
        } catch (error: any) {
            console.error("Failed to sync github commit: ", error);
        }
    }
}

export const commitUsecase = new CommitUsecase();