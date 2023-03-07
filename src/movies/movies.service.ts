import MovieModel from "@/movies/entities/movie.model";
import { ObjectId, Types } from "mongoose";
import { MovieDTO } from "@/movies/dtos/movie.dto";
import { Movie } from "@/movies/interfaces/movie";
import { HttpException } from "@/exceptions/HttpException";

class MovieService {
  public list = async (): Promise<Movie[]> => {
    const movies: Movie[] = await MovieModel.find({ deleted_at: null });
    return movies;
  };
  public getById = async (id: string): Promise<Movie> => {
    const movie: Movie = await MovieModel.findById({_id: new Types.ObjectId(id), deleted_at: null});
    if (!movie) throw new HttpException(400, "movie not found")
    return movie;
}
  public create = async (movieData: MovieDTO): Promise<ObjectId> => {
    const newData = await MovieModel.create(movieData);
    const createdData = await newData.save();
    return createdData._id;
  };
  public update = async (
    id: string,
    movieData: MovieDTO
  ): Promise<ObjectId> => {
    const movie = await this.getById(id);
    if (!movie) throw new HttpException(400, "movie not found");
    const getUpdatedData = await MovieModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      movieData
    );
    return getUpdatedData.id;
  };
  public delete = async (id: string): Promise<void> => {
    const movie = await this.getById(id);
    if (!movie) throw new HttpException(400, "movie not found");
    const updateMovie = await MovieModel.updateOne(
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
export default MovieService;
