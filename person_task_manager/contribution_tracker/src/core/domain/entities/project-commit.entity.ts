export interface ProjectCommitEntity extends Document {
    _id: string;
    projectId: string;
    projectName: string;
    githubRepo: string;
}