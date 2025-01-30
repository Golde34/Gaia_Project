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

    async syncGithubCommit(user: UserCommitEntity, project: ProjectCommitEntity): Promise<Date | null> {
        try {
            if (!user.githubAccessToken || !user.githubLoginName) {
                return null;
            }
            let commits: any[] = [];
            if (!project.firstTimeSynced) {
                commits = await this.getAllCommitsRepo(user.githubLoginName, user.githubAccessToken, project.githubRepo);
            } else {
                if (!project.lastTimeSynced) {
                    throw new Error("lastTimeSynced is undefined");
                }
                const lastTimeSynced: string = format(new Date(project.lastTimeSynced), 'yyyy-MM-ddTHH:mm:ssZ');
                commits = await this.getLatestCommitsRepo(user.githubLoginName, user.githubAccessToken, project.githubRepo, lastTimeSynced);
            }

            if (!commits) {
                console.error("Failed to get github commits for user: ", user.githubLoginName);
                return null;
            }

            const isProjectNeedSync = await this.isProjectNeedSync(commits[0], project, user.githubLoginName, user.githubAccessToken);
            if (!isProjectNeedSync) {
                return null;
            }

            for (const commit of commits) {
                if (commit.commit.committer.name !== user.githubLoginName) {
                    continue;
                }
                this.addGithubCommit(user.userId, commit);
            }
            return commits[0].commit.committer.date;
        } catch (error) {
            console.error("Error on syncGithubCommit: ", error);
            return null;
        }
    }

    private async getAllCommitsRepo(githubLoginName: string, githubAccessToken: string, githubRepo: string,): Promise<any> {
        let page = 1;
        let perPage = 100;
        let allCommits: any[] = [];
        let hasMore = true;
        while (hasMore) {
            const url = `https://api.github.com/repos/${githubLoginName}/${githubRepo}/commits?page=${page}&per_page=${perPage}`;
            const response = await this.githubClient.getGithubCommits(url, githubAccessToken);
            const commits = response.data;

            if (commits.length > 0) {
                allCommits = allCommits.concat(commits);
                page += 1;
            } else {
                hasMore = false;
            }
        }

        return allCommits;
    }

    private async getLatestCommitsRepo(githubLoginName: string, githubAccessToken: string, githubRepo: string, lastTimeSynced: string): Promise<any> {
        let page = 1;
        let perPage = 100;
        let allCommits: any[] = [];
        let hasMore = true;
        const now = format(new Date(), 'yyyy-MM-ddTHH:mm:ssZ');
        while (hasMore) {
            const url = `https://api.github.com/repos/${githubLoginName}/${githubRepo}/commits?page=${page}&per_page=${perPage}&since=${lastTimeSynced}&until=${now}`
            const response = await this.githubClient.getGithubCommits(url, githubAccessToken);
            const commits = response.data;

            if (commits.length > 0) {
                allCommits = allCommits.concat(commits);
                page += 1;
            } else {
                hasMore = false;
            }
        }

        return allCommits;
    }

    private async isProjectNeedSync(lastGithubCommit: any, projectCommit: ProjectCommitEntity, githubLoginName: string, githubAccessToken: string): Promise<boolean> {
        try {
            if (!projectCommit || !projectCommit.id) {
                console.error("Project commit not found for project: ", projectCommit.id);
                return false;
            }

            const lastTimeSynced = projectCommit.lastTimeSynced;
            if (!lastTimeSynced) {
                console.log("User have never synced the project: ", projectCommit.id);
                return true;
            }
            if (!lastGithubCommit) {
                console.error("Last github commit not found for project: ", projectCommit.id);
                return false;
            }
            if (lastGithubCommit.commit.committer.date > lastTimeSynced) {
                console.log("Project needs to be synced: ", projectCommit.id);
                return true;
            }

            console.log("Project does not need to be synced: ", projectCommit.id);
            return false;
        } catch (error) {
            console.error("Error on isProjectNeedSync: ", error);
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