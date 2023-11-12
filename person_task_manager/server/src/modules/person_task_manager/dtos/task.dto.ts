import { IsOptional, IsString } from "class-validator";

export class TaskRequestDto {
    @IsString()
    title!: string;
    @IsString()
    @IsOptional()
    description?: string;
    @IsString()
    @IsOptional()
    priority?: string[];
    @IsString()
    @IsOptional()
    status?: string;
    @IsString()
    createdAt!: Date;
    @IsString()
    updatedAt!: Date;
    @IsString()
    @IsOptional()
    deadline?: Date;
    @IsString()
    @IsOptional()
    subTasks?: string[];
    @IsString()
    @IsOptional()
    comments?: string[];
}