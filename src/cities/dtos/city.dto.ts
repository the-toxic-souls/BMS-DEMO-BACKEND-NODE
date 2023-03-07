import { IsNameAlreadyExist } from "@/custom_decorators";
import { IsNotEmpty, IsString } from "class-validator";

export class CityDTO{

    @IsNotEmpty()
    @IsString()
    @IsNameAlreadyExist({message: "City already exists"})
    name: string;
}