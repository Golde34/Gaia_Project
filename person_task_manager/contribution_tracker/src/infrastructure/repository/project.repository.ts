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
}