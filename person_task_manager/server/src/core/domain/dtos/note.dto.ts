import { IsOptional, IsString } from "class-validator";

export class NoteRequestDto {
    @IsString()
    @IsOptional()
    name?: string;
    ownerId!: number;
    @IsString()
    fileId!: string;
    @IsString()
    fileName!: string;
    @IsString()
    @IsOptional()
    summaryDisplayText?: string;
}