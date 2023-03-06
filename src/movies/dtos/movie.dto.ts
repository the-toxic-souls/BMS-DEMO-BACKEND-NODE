import { IsNameAlreadyExist } from "@/custom_decorators";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

    @IsOptional()
    @IsNumber()
    rating: number;

    @IsOptional()
    @IsArray()
    genre: string[];

    @IsOptional()
    @IsString()
    tagline: string;
}

export class UpdateDTO {

  @IsOptional()
  @IsString()
  @IsNameAlreadyExist({
      message: 'Movie $value already exists. Choose another name.',
    })
  name?: string;

  @IsOptional()
  @IsString()
  release_date?: Date;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsArray()
  genre?: string[];

  @IsOptional()
  @IsString()
  tagline?: string;
}