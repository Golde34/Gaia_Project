import { IsString } from "class-validator";

export class CommentRequestDto {
    @IsString()
    content!: string;
    @IsString()
    createdAt!: Date;
    @IsString()
    updatedAt!: Date;
}