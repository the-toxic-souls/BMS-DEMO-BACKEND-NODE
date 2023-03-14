import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import MovieModel from "@/movies/entities/movie.entity";
import TheatreModel from "@/theatres/entities/theatre.entity";
import CityModel from "@/cities/entities/city.entity";
import TheatresMoviesModel from "@/theatres/entities/theatres_movies.entities";
import { ShowTimes } from "@/theatres/dtos/theatres.movies.dto";

@ValidatorConstraint({ async: true })
export class IsNameAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(name: any, args: ValidationArguments) {
    if (args.targetName === "MovieDTO") {
      return await MovieModel.findOne({ name: name }).then((movie) => {
        if (movie) return false;
        return true;
      });
    } else if (args.targetName === "CityDTO") {
      return await CityModel.findOne({ name: name }).then((city) => {
        if (city) return false;
        return true;
      });
    } else {
      return await TheatreModel.findOne({ name: name }).then((theatre) => {
        if (theatre) return false;
        return true;
      });
    }
  }
}
export function IsNameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNameAlreadyExistConstraint,
    });
  };
}
