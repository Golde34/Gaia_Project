import { ActiveStatus } from "../../../core/domain/enums/enums";

export interface IUserTagEntity extends Document {
    _id: string;
    name: string;
    color: string;
    weight: number;
    activeStatus: ActiveStatus;
    ownerId: number;
}