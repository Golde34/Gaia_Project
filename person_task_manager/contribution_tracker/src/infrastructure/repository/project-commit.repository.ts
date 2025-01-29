import { ProjectCommitEntity } from "../../core/domain/entities/project-commit.entity";
import Repository from "../database/repository";

export class ProjectCommitRepository extends Repository {
    private static instance: ProjectCommitRepository;

    public static getInstance(): ProjectCommitRepository {
        if (!ProjectCommitRepository.instance) {
            ProjectCommitRepository.instance = new ProjectCommitRepository();
        }
        return ProjectCommitRepository.instance;
    }

    constructor() {
        super('project_commit');
    }

    async updateSyncedTime(projectId: string): Promise<void> {
        await this.update(projectId, {
            lastTimeSynced: new Date(),
            updateAt: new Date(),
            userSynced: false,
            userNumberSynced: 0,
        });
    }
}
