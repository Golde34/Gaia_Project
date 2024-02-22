import { IsString } from "class-validator";

export class updateNameRequestDto {
    @IsString()
    newName!: string;
}