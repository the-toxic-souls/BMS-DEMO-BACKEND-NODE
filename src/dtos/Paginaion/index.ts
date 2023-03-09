import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min, ValidateIf } from "class-validator";

export class Paginations {
    @IsOptional()
    @Transform(type => type.value === "string" ? {message: " page must be integer"}: +type.value)
    @IsInt()
    @Min(1)
    page: number;

    @IsOptional()
    @Transform(type => type.value === "string" ? {message: " limit must be integer"}: +type.value)
    @IsInt()
    @Min(1)
    limit: number;
}