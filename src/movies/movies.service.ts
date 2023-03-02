import MovieModel from "@/movies/entities/movie.model";
import { isObjectIdOrHexString, ObjectId, Types } from "mongoose";
import { CreateDTO, UpdateDTO } from "@/movies/dtos/movie.dto";
import { Movie } from "@/movies/interfaces/movie";
import { HttpException } from "@/exceptions/HttpException";

class MovieService {
  public getAllMovie = async (): Promise<Movie[]> => {
    const movies: Movie[] = await MovieModel.find({ deleted_at: null });
    return movies;
  };
  public create = async (movieData: CreateDTO): Promise<ObjectId> => {
    const newData = await MovieModel.create({
      name: movieData.name,
      release_date: movieData.release_date,
      duration: movieData.duration,
      rating: movieData.rating,
      genre: movieData.genre,
      tagline: movieData.tagline,
    });
    const createdData = await newData.save();
    return createdData._id;
  };
  public update = async (
    id: string,
    movieData: UpdateDTO
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
      throw new HttpException(409, `${find.id} already exists`);
  };
}
export default MovieService;
