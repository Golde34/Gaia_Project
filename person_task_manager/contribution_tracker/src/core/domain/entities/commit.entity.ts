export interface ICommitEntity extends Document {
    _id: string;
    content: string;
    commitTime: Date;
    userId: number;
    projectId: string;
}