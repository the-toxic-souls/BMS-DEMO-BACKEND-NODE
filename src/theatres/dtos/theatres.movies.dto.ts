import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, MATCHES, Matches, Validate, ValidateNested } from "class-validator";
import { Schema } from "mongoose";

export class ShowTimes{
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @Matches(RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$'))
    show_time_start: string;

    @IsNotEmpty()
    @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    show_time_end: string;
}

export class TheatresMoviesDTO {
    @IsNotEmpty()
    @IsMongoId()
    movie_id: string;

    @IsNotEmpty()
    @IsMongoId()
    theatre_id: string;

    @IsNotEmpty()
    @IsArray()
    show_times: ShowTimes[];

    @IsNotEmpty()
    @IsDateString()
    start_date: Date;

    @IsOptional()
    @IsDateString()
    end_date: Date;

}