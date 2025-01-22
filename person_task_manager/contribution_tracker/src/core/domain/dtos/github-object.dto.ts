import { IsString } from "class-validator";

export class GithubRepoDto {
    @IsString()
    name!: string;
    @IsString()
    htmlUrl!: string;
    @IsString()
    description!: string;
    @IsString()
    owner!: string;
    @IsString()
    language!: string;
}