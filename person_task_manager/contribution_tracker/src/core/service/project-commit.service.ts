import { ProjectCommitRepository } from "../../infrastructure/repository/project-commit.repository";
import { SyncProjectRepoDto } from "../domain/dtos/github-object.dto";
import { ProjectCommitEntity } from "../domain/entities/project-commit.entity";

class ProjectCommitService {
    constructor(
        private projectCommitRepository: ProjectCommitRepository = ProjectCommitRepository.getInstance(),
    ) { }

    async syncProjectRepo(request: SyncProjectRepoDto): Promise<string> {
        try {
            console.log("Syncing project repo: ", request);
            const projectEntity: ProjectCommitEntity = {
                userCommitId: request.userId,
                githubRepo: request.repoName,
                githubRepoUrl: request.repoUrl,
                projectId: request.projectId,
                projectName: request.projectName,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            await this.projectCommitRepository.insert(projectEntity);
            return "Project repo synced";
        } catch (error) {
            console.error("Error on syncProjectRepo: ", error);
            return "Error on syncProjectRepo";
        }
    }

    async getProjectCommitsByUserId(userId: number): Promise<ProjectCommitEntity[]> {
        try {
            console.log("Getting project commits for user: ", userId);
            return await this.projectCommitRepository.findByCondition("user_commit_id = ?", [userId]);
        } catch (error) {
            console.error("Error on getProjectCommits: ", error);
            return [];
        }
    }

    async deleteProjectCommit(userId: number, projectId: string): Promise<ProjectCommitEntity | undefined> {
        try {
            const projectCommits: ProjectCommitEntity[] = await this.projectCommitRepository.findByCondition("user_commit_id = ? AND project_id = ?", [userId, projectId]);
            const projectCommit: ProjectCommitEntity | undefined = projectCommits[0];
            if (!projectCommit || !projectCommit.id) {
                console.error("Project commit not found for user: ", userId, " and project: ", projectId);
                return undefined;
            }
            console.log("Deleting project commit for user: ", userId, " and project: ", projectId);
            await this.projectCommitRepository.delete(projectCommit.id);
            return projectCommit;
        } catch (error) {
            console.error("Error on deleteProjectCommit: ", error);
            return undefined;
        }
    }

    async getProjectCommitsByTime(): Promise<ProjectCommitEntity[]> {
        try {
            console.log("Getting project commits by time");
            return await this.projectCommitRepository.findByCondition("last_time_synced < ?", [new Date()]);
        } catch (error) {
            console.error("Error on getProjectCommitsByTime: ", error);
            return [];
        }
    }

    async resetProjectCommitsSyncedTime(projectId: string): Promise<void> {
        try {
            console.log("Updating project commits synced time");
            await this.projectCommitRepository.updateSyncedTime(projectId);
        } catch (error) {
            console.error("Error on updateProjectCommitsSyncedTime: ", error);
        }
    }

    async getUnsyncedProjects(): Promise<ProjectCommitEntity[]> {
        try {
            console.log("Getting unsynced projects");
            return await this.projectCommitRepository.findByCondition("user_synced = ?", [false]);
        } catch (error) {
            console.error("Error on getUnsyncedProjects: ", error);
            return [];
        }
    }
}

export const projectCommitService = new ProjectCommitService();