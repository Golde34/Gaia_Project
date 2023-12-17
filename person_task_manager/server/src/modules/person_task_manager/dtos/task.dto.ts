import { IsOptional, IsString } from "class-validator";

export class TaskRequestDto {
    @IsString()
    title!: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsOptional()
    priority?: string[];
    @IsString()
    @IsOptional()
    status?: string;
    @IsString()
    @IsOptional()
    startDate?: Date;
    @IsString()
    @IsOptional()
    deadline?: Date;
    @IsString()
    @IsOptional()
    duration?: number;
    @IsString()
    @IsOptional()
    subTasks?: string[];
    @IsString()
    @IsOptional()
    comments?: string[];
}

export class GenerateTaskFromScratchRequestDTO {
    @IsString()
    title!: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsOptional()
    prioriry?: string[];
    @IsString()
    @IsOptional()
    status?: string;
    @IsString()
    @IsOptional()
    startDate?: Date;
    @IsString()
    @IsOptional()
    deadline?: Date;
    @IsString()
    @IsOptional()
    duration?: number;
    @IsString()
    projectId!: string;
}

export class UpdaetTaskInDialogDTO {
    @IsString()
    title!: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsString()
    status!: string;
}