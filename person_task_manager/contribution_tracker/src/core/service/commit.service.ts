import { format } from "date-fns";
import CacheSingleton from "../../infrastructure/cache/cache-singleton";
import { KafkaConfig } from "../../infrastructure/kafka/kafka-config";
import { CommitRepository } from "../../infrastructure/repository/commit.repository";
import { ICommitEntity } from "../domain/entities/commit.entity";
import { ProjectCommitEntity } from "../domain/entities/project-commit.entity";
import { UserCommitEntity } from "../domain/entities/user-commit.entity";
import { githubClientAdapter } from "../../infrastructure/client/github-client.adapter";

class CommitService {
    constructor(
        private kafkaConfig = new KafkaConfig(),
        private commitCache = CacheSingleton.getInstance().getCache(),
        private commitRepository: CommitRepository = CommitRepository.getInstance(),
        private githubClient = githubClientAdapter,
    ) { }

    async syncGithubCommit(user: UserCommitEntity, project: ProjectCommitEntity): Promise<boolean> {
        try {
            if (!user.githubAccessToken) {
                return false;
            }
            const commits = await this.githubClient.getGithubCommits(user.githubAccessToken, project.githubRepo);
            for (const commit of commits) {
                if (commit.commit.committer.name !== user.githubLoginName) {
                    continue;
                }
                this.addGithubCommit(user.userId, commit);
            }
            return true;
        } catch (error) {
            console.error("Error on syncGithubCommit: ", error);
            return false;
        }
    }

    async addGithubCommit(userId: number, commit: any): Promise<void> {
        try {
            console.log("Syncing github commit: ", commit);
            const commitEntity: ICommitEntity = {
                id: 0,
                content: commit.commit.message,
                commitTime: new Date(),
                userId: userId,
                type: "github",
                projectId: "",
                taskId: "",
                subTaskId: "",
                scheduleTaskId: "",
                githubCommitId: commit.sha,
                commitAuthor: commit.commit.author.name,
                committerName: commit.commit.committer.name,
                committerEmail: commit.commit.committer.email,
                githubCommitDate: format(new Date(commit.commit.committer.date), 'yyyy-MM-dd HH:mm:ss'),
                commitMessage: commit.commit.message,
                commitUrl: commit.html_url,
            }
            this.commitRepository.insert(commitEntity);
        } catch (error: any) {
            console.error("Failed to sync github commit: ", error);
        }
    }

    async getUserCommits(userId: number): Promise<ICommitEntity[] | null> {
        return null;
    }

    async getProjectCommits(userId: number, projectId: string): Promise<ICommitEntity[] | null> {
        return null;
    }

    async createCommit(commitObject: any): Promise<ICommitEntity | null> {
        return null;
    }
}

export const commitService = new CommitService();