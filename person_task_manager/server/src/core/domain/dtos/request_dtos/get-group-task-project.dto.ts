import { IsString } from "class-validator";

export class GetGroupTaskProject {
    @IsString()
    groupTask!: string;
    @IsString()
    project!: string;
}