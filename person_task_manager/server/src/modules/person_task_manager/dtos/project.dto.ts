import { IsOptional, IsString } from "class-validator";

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
    @IsString()
    ownerId!: string;
}

export class UpdateColorDto {
    @IsString()
    color!: string;
}