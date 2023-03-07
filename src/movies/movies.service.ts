import MovieModel from "@/movies/entities/movie.model";
import { ObjectId, Types } from "mongoose";
import { MovieDTO } from "@/movies/dtos/movie.dto";
import { Movie } from "@/movies/interfaces/movie";
import { HttpException } from "@/exceptions/HttpException";

class MovieService {
  public getAllMovie = async (): Promise<Movie[]> => {
    const movies: Movie[] = await MovieModel.find({ deleted_at: null });
    return movies;
  };
  public create = async (movieData: MovieDTO): Promise<ObjectId> => {
    const newData = await MovieModel.create(movieData);
    const createdData = await newData.save();
    return createdData._id;
  };
  public update = async (
    id: string,
    movieData: MovieDTO
  ): Promise<ObjectId> => {
    const getUpdatedData = await MovieModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      movieData
    );
    return getUpdatedData.id;
  };
  public delete = async (id: string): Promise<void> => {
    const find = await MovieModel.findById(new Types.ObjectId(id));
    if (!find) throw new HttpException(400, "id not found");
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
      throw new HttpException(409, `${find.id} already deleted`);
  };
}
export default MovieService;
