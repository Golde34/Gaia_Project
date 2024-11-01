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

export class UpdateNoteRequestDto {
    @IsString()
    noteId!: string;
    @IsString()
    @IsOptional()
    name?: string;
    @IsString()
    fileId!: string;
    @IsString()
    fileName!: string;
    @IsString()
    @IsOptional()
    summaryDisplayText?: string;
}