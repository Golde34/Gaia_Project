import { ActiveStatus } from "../enums/enums";

export interface ICommentEntity extends Document {
    _id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    activeStatus: ActiveStatus;
}