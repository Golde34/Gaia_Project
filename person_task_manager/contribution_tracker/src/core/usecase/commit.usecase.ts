import { IResponse } from "../common/response";
import { msg200, msg400 } from "../common/response-helpers";
import { commitService } from "../service/commit.service";

class CommitUsecase {
    constructor(
        public commitServiceImpl = commitService,
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
            console.log("Syncing github commit: ", data);
        } catch (error: any) {
            console.error("Failed to sync github commit: ", error);
        }
    }
}

export const commitUsecase = new CommitUsecase();