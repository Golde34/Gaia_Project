export interface UserCommitEntity {
    id?: string;
    userId: number;
    githubUrl?: string;
    githubSha?: string;
    githubAccessToken?: string;
    userConsent: boolean;
    userState: string;
}
