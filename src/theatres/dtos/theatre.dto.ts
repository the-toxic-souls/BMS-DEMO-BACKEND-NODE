import { IsArray, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDTO{
    @IsNotEmpty()
    @IsString()
    public name: string

    @IsNotEmpty()
    @IsString()
    public address: string;

    @IsNotEmpty()
    @IsMobilePhone()
    public phone: string;

    @IsNotEmpty()
    @IsNumber()
    public seat: number;

    @IsNotEmpty()
    @IsArray()
    public category: string[];

    @IsOptional()
    @IsString()
    public description: string;
}