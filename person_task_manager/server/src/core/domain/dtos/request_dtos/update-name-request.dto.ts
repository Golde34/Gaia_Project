import { IsString } from "class-validator";

export class updateNameRequestDto {
    @IsString()
    name!: string;
}