export interface ProjectCommitEntity {
    id?: string;
    projectId: string;
    projectName?: string;
    githubRepo: string;
    githubRepoUrl: string;
    userCommitId?: number;
    userSynced?: boolean;
    userNumberSynced?: number;
    lastTimeSynced?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}