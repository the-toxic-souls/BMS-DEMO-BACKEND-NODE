import { IsNotEmpty, IsString } from "class-validator";

export class UserLogin {

    @IsNotEmpty()
    @IsString()
    public username: string;

    @IsNotEmpty()
    @IsString()
    public password: string;
}