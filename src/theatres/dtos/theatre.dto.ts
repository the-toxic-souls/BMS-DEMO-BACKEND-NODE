import { IsNameAlreadyExist } from "@/custom_decorators";
import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsMobilePhone,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { isValidObjectId, Schema } from "mongoose";

enum SeatLayouts {
  BALCONY = "balcony_class",
  MIDDLE = "middle_class",
  LOWER = "lower_class",
}

enum Types {
  PROSCENIUM = "proscenium",
  THRUST = "thrust",
  ARENA = "arena",
  FOUND = "found",
}

enum Category{
  AC = "ac",
  NON_AC = "non-ac",
  BOTH = "both"
}
export class TheatreDTO {
  @IsNotEmpty()
  @IsString()
  @IsNameAlreadyExist({ message: "Theatre already exists" })
  public name: string;

  @IsNotEmpty()
  @IsString()
  public address: string;

  @IsOptional()
  @IsMobilePhone()
  public phone: string;

  @IsNotEmpty()
  @IsNumber()
  public seat: number;

  @IsNotEmpty()
  @IsMongoId()
  public city_id: Schema.Types.ObjectId;

  @IsOptional()
  @IsEnum(SeatLayouts)
  public seat_layouts: SeatLayouts;

  @IsOptional()
  @IsEnum(Types)
  public types: Types;

  @IsOptional()
  @IsEnum(Category)
  public category: Category;

  @IsOptional()
  @IsString()
  public description: string;
}


