import { IsOptional, IsString } from "class-validator";

export class SubTaskRequestDto {
    @IsString()
    mission!: string;
    @IsString()
    deadline!: Date;
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
}