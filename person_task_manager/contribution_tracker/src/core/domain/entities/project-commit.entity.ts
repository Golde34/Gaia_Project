export interface ProjectCommitEntity {
    id?: string;
    projectId: string;
    projectName?: string;
    githubRepo: string;
    githubRepoUrl: string;
    userCommitId?: number;
}