import MovieService from "@/movies/movies.service";
import { NextFunction, Request, Response } from "express";

class MovieController {
    public movieService = new MovieService();
    public getAllMovie = (req: Request, res: Response, next: NextFunction) => {
        const get = this.movieService.getAllMovie();
       res.status(201).json({ message: get})
    }
}

export default MovieController;