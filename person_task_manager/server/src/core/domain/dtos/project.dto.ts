import { IsOptional, IsString } from "class-validator";
import { TaskTagRequest } from "./request_dtos/tag.dto";

export class ProjectRequestDto {
    @IsString()
    name!: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsString()
    @IsOptional()
    status?: string;
    @IsString()
    @IsOptional()
    color?: string;
    @IsString()
    @IsOptional()
    groupTasks?: string[];
    ownerId!: number;
    @IsString()
    @IsOptional()
    activeStatus?: string;
    tag!: TaskTagRequest;
}

export class UpdateColorDto {
    @IsString()
    color!: string;
}