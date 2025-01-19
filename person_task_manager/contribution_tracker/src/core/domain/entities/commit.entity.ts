export interface ICommitEntity {
    id: number;
    content: string;
    commitTime: Date;
    userId: number;
    projectId?: string;
    type: string;
    taskId: string;
    subTaskId: string;
    scheduleTaskId: string;
    githubCommitId: string;
    commitAuthor: string;
    committerName: string;
    committerEmail: string;
    githubCommitDate: string;
    commitMessage: string;
    commitUrl: string;
}
