import { isString } from "class-validator";

export class TaskTagRequest {
    @IsString()
    tagName!: string;
    tagWeightName!: number;
}