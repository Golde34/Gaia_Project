import { IsOptional, IsString } from "class-validator";

export class NoteRequestDto {
    @IsString()
    @IsOptional()
    name?: string;
    ownerId!: number;
}