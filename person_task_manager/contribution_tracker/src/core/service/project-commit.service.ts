import { ProjectCommitRepository } from "../../infrastructure/repository/project.repository";
import { SyncProjectRepoDto } from "../domain/dtos/github-object.dto";
import { ProjectCommitEntity } from "../domain/entities/project-commit.entity";
import { UserCommitEntity } from "../domain/entities/user-commit.entity";

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
            }
            await this.projectCommitRepository.insert(projectEntity);
            return "Project repo synced";
        } catch (error) {
            console.error("Error on syncProjectRepo: ", error);
            return "Error on syncProjectRepo";
        }
    }
}

export const projectCommitService = new ProjectCommitService();