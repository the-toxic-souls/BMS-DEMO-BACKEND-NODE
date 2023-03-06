import { IsNameAlreadyExist } from "@/custom_decorators";
import { IsArray, IsEnum, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TheatreDTO{
    @IsNotEmpty()
    @IsString()
    @IsNameAlreadyExist({message: "Theatre already exists"})
    public name: string

    @IsNotEmpty()
    @IsString()
    public address: string;

    @IsOptional()
    @IsMobilePhone()
    public phone: string;

    @IsNotEmpty()
    @IsNumber()
    public seat: number;

    @IsOptional()
    @IsEnum(["balcony_class", "middle_class", "lower_class"])
    seat_layouts: string;

    @IsOptional()
    @IsEnum(["proscenium", "thrust", "arena", "found"])
    types: string;

    @IsOptional()
    @IsEnum(["a/c", "non-a/c", "both"])
    public category: string;

    @IsOptional()
    @IsString()
    public description: string;
}