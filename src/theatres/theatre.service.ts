import { TheatreDTO } from "@/theatres/dtos/theatre.dto";
import TheatreModel from "@/theatres/entities/theatre.entity";
import { ObjectId, Types } from "mongoose";
import { Theatre } from "@/theatres/interfaces/theatre.interface";
import CityModel from "@/cities/entities/city.entity";
import { HttpException } from "@/exceptions/HttpException";
import { Paginations } from "@/dtos/Paginaion";
import { TheatresMoviesDTO } from "./dtos/theatres.movies.dto";
import MovieService from "@/movies/movies.service";
import TheatresMoviesModel from "@/theatres/entities/theatres_movies.entities";

class TheatreService {
    public movieService = new MovieService();
    public list = async (pagination: Paginations): Promise<Theatre[]> => {
        const { page, limit } = pagination;
        return await TheatreModel.find({ deleted_at: null }).skip((page-1) * limit).limit(limit);
    }
    public getById = async (id: string): Promise<Theatre> => {
        const theatre: Theatre = await TheatreModel.findById({_id: new Types.ObjectId(id), deleted_at: null});
        if (!theatre) throw new HttpException(400, "theatre not found")
        return theatre;
    }
    public create = async (theatreDTO: TheatreDTO): Promise<ObjectId> => {
        const city = await CityModel.findById(theatreDTO.city_id);
        if (!city) throw new HttpException(400, "City not found");
        const newData = await TheatreModel.create(theatreDTO);
        const theatre = await newData.save();
        return theatre._id;
    }
    public theatreMovieCreate = async (theatreMovieDTO: TheatresMoviesDTO): Promise<ObjectId> => {
        const movie = await this.movieService.getById(theatreMovieDTO.movie_id);
        const theatre = await this.getById(theatreMovieDTO.theatre_id);
        if (!movie) throw new HttpException(400, "Movie not found");
        if (!theatre) throw new HttpException(400, "Theatre not found");
        const newData = await TheatresMoviesModel.create({
          movie_id: theatreMovieDTO.movie_id,
          theatre_id: theatreMovieDTO.theatre_id,
          show_times: theatreMovieDTO.show_times,
          start_date: theatreMovieDTO.start_date,
          end_date: theatreMovieDTO.end_date
        });
        const theatreMovie = await newData.save();
        return theatreMovie._id;
    }
    public update = async (
        id: string,
        theatreDTO: TheatreDTO
      ): Promise<ObjectId> => {
        const theatre = await this.getById(id);
        if (!theatre ) throw new HttpException(400, "Theatre not found")
        const getUpdatedData = await TheatreModel.findByIdAndUpdate(
          new Types.ObjectId(id),
          theatreDTO
        );
        return getUpdatedData._id;
      };
    public delete = async (id: string): Promise<void> => {
        const theatre = await this.getById(id);
        if (!theatre) throw new HttpException(400, "theatre not found");
        const updateMovie = await TheatreModel.updateOne(
          { _id: new Types.ObjectId(id) },
          {
            $set: {
              deleted_at: new Date(Date.now()),
            },
          },
          { upsert: false, new: false }
        );
        if (!updateMovie.modifiedCount)
          throw new HttpException(409, `${id} already deleted`);
      };
}

export default TheatreService;