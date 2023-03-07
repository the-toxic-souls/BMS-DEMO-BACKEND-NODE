import MovieService from "@/movies/movies.service";
import { NextFunction, Request, Response } from "express";
import { MovieDTO } from "@/movies/dtos/movie.dto";

class MovieController {
    public movieService = new MovieService();
    public getAllMovie = async (req: Request, res: Response, next: NextFunction) => {
        const getMovies = await this.movieService.getAllMovie();
       res.status(201).json(getMovies)
    }
    public create = async( req: Request, res: Response, next: NextFunction) => {
        try{
            const movieData: MovieDTO = req.body;
            const id = await this.movieService.create(movieData);
           res.status(201).json({status: true, message: `${id} created successfully`})
        }catch (err) {
            console.log(err);

            next(err)
        }
    }
    public update = async( req: Request, res: Response, next: NextFunction) => {
        try{
            const id = req.params.id;
            const movieData: MovieDTO = req.body;
            const updated_id = await this.movieService.update(id, movieData);
           res.status(201).json({status: true, message: `${updated_id} update successfully`})
        }catch (err) {
            next(err)
        }
    }
    public delete = async( req: Request, res: Response, next: NextFunction) => {
        try{
            const id = req.params.id;
            await this.movieService.delete(id);
           res.status(201).json({status: true, message: `${id} deleted successfully`})
        }catch (err) {
            next(err)
        }
    }
}

export default MovieController;