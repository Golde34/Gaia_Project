import { IsOptional, IsString } from "class-validator";
import { Priority, Status } from "../../../loaders/enums";

export class CreateGroupTaskRequestDto {
    @IsString()
    title!: string;
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    prioriry?: Priority;
    @IsOptional()
    @IsString()
    status?: Status;
    @IsOptional()
    @IsString()
    tasks?: string[];
    @IsString()
    projectId!: string;
}