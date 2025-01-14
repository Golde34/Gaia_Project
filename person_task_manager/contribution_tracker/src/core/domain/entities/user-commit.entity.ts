export interface UserCommitEntity {
    id?: string;
    userId: number;
    githubUrl?: string;
    githubSha?: string;
    userConsent: boolean;
    userState: string;
}
