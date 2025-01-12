export interface UserCommitEntity extends Document {
    id: string;
    userId: number;
    githubUrl: string;
    githubSha: string;
    userConsent: boolean;
}