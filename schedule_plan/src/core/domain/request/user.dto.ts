import { IsOptional, IsString } from "class-validator";

export class UserDTO {
    @IsString()
    @IsOptional()
    username?: string;
    @IsString()
    @IsOptional()
    email?: string;
    maxWorkTime!: number;
    sleepTime!: number;
    relaxTime!: number;
    eatTime!: number;
    travelTime!: number;
    @IsString()
    sleepStart!: string;
    @IsString()
    sleepEnd!: string;
}