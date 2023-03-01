import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
