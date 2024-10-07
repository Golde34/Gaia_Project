import { IsString } from "class-validator";

export class GetGroupTaskProject {
    userId!: number
    @IsString()
    groupTask!: string;
    @IsString()
    project!: string;
}