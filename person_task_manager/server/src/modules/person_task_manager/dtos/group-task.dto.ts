import { IsOptional, IsString } from "class-validator";

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
}

export class updateGroupTaskNameRequestDto {
    @IsString()
    title!: string;
}