import { IsString } from "class-validator";
import { ActiveStatus } from "../../enums/enums";

export interface TaskTag {
    name: string;
    weight: number;
    color: string;
    activeStatus: ActiveStatus;
    ownerId: number;
}

export class TaskTagRequest {
    name!: string;
    weight!: number;
    color!: string;
    activeStatus!: ActiveStatus;
    ownerId!: number;
}
