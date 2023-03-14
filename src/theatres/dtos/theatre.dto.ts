import { IsNameAlreadyExist } from "@/custom_decorators";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
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

  @IsBoolean()
  public isAC: boolean;

  @IsBoolean()
  public isNonAC: boolean;

  @IsOptional()
  @IsString()
  public description: string;
}


