import { IsInt, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class UserCreate {

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsMobilePhone()
  public phone: string;

  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
