import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IsMovieAlreadyExist } from "../custom_decorators";

export class CreateDTO {

    @IsNotEmpty()
    @IsString()
    @IsMovieAlreadyExist({
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
  @IsMovieAlreadyExist({
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