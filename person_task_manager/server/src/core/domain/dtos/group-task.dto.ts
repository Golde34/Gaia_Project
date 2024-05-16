import { IsOptional, IsString } from "class-validator";
import { TaskTagRequest } from "./request_dtos/task-tag-request.dto";

export class GroupTaskRequestDto {
    @IsString()
    title!: string;
    @IsOptional()
    @IsString()
    description?: string;
    @IsOptional()
    prioriry?: string[];
    @IsOptional()
    @IsString()
    status?: string;
    @IsOptional()
    @IsString()
    tasks?: string[];
    @IsString()
    projectId!: string;
    tag!: TaskTagRequest;
}