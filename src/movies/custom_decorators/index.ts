import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import MovieModel from '@/movies/entities/movie.model';

  @ValidatorConstraint({ async: true })
  export class IsMovieAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(name: any, args: ValidationArguments) {
      return await MovieModel.findOne({name: name}).then(movie => {
        if (movie) return false;
        return true;
      });
    }
  }

  export function IsMovieAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsMovieAlreadyExistConstraint,
      });
    };
  }