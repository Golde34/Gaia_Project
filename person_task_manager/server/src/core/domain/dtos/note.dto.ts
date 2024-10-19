import { IsString } from "class-validator";

export class NoteRequestDto {
    @IsString()
    name!: string;
}