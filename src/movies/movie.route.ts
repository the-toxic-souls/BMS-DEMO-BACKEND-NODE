import MovieController from "@/movies/movies.controller";
import { Routes } from "@/interfaces/routes.interface";
import AuthMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import validationMiddleware from "@/middlewares/validation.middleware";
import { CreateDTO, UpdateDTO } from "@/movies/dtos/movie.dto";

class MovieRoutes implements Routes {
   public path: string = '/movies';
   public router = Router();
   public movieController = new MovieController();
   constructor() {
    this.initializedRoutes();
   }
   private initializedRoutes(){
      this.router.get(`${this.path}/list`, this.movieController.getAllMovie);
      this.router.post(`${this.path}/create`, AuthMiddleware.auth, validationMiddleware(CreateDTO, 'body'), this.movieController.create);
      this.router.put(`${this.path}/update/:id`, AuthMiddleware.auth, validationMiddleware(UpdateDTO), this.movieController.update);
      this.router.delete(`${this.path}/delete/:id`, AuthMiddleware.auth, this.movieController.delete);
   }
}
export default MovieRoutes;