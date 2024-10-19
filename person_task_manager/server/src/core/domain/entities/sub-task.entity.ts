import { ActiveStatus } from "../../../core/domain/enums/enums";

export interface ISubTaskEntity extends Document {
    _id: string;
    mission: string;
    deadline: Date;
    priority: string[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
    activeStatus: ActiveStatus;
}