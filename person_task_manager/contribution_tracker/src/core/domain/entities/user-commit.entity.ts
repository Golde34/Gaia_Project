export interface UserCommitEntity extends Document {
    _id: string;
    userId: number;
    githubUrl: string;
    githubSha: string;
    userConsent: boolean;
}