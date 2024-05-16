import { IsString } from "class-validator";

export interface TaskTag {
    tagName: string;
    tagWeightValue: number;
}

export class TaskTagRequest {
    @IsString()
    tagName!: string;
    tagWeightName!: number;
}