import { IsNameAlreadyExist } from "@/custom_decorators";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, validate, ValidateIf, ValidateNested } from "class-validator";

export class MovieDTO {

    @IsNotEmpty()
    @IsString()
    @IsNameAlreadyExist({
        message: 'Movie $value already exists. Choose another name.',
      })
    name: string;

    @IsNotEmpty()
    @IsString()
    release_date: Date;

    @IsNotEmpty()
    @IsNumber()
    duration: number;

    @ValidateIf((o)=> o.rating_source !== undefined)
    @IsNumber()
    rating: number;

    @ValidateIf((o)=> o.rating !== undefined)
    @IsString()
    rating_source: string;


    @IsOptional()
    @IsArray()
    genre: string[];

    @IsOptional()
    @IsString()
    tagline: string;

    @IsOptional()
    @IsArray()
    directors?: string[];

    @IsOptional()
    @IsArray()
    writers?: string[];

    @IsOptional()
    @IsArray()
    casts?: string[];
}
