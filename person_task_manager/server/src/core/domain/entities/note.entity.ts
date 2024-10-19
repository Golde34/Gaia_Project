import { ActiveStatus } from "../../../core/domain/enums/enums";
import { IUserTagEntity } from "./user-tag.entity";

export interface INoteEntity extends Document {
    _id: string;
    name: string;
    summaryDisplayText: string;
    fileLocation: string;
    isLock: boolean;
    tag: IUserTagEntity;
    activeStatus: ActiveStatus;
    createdAt: Date;
    updatedAt: Date;
}