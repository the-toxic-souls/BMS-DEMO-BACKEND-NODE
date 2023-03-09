import MovieController from "@/movies/movies.controller";
import { Routes } from "@/interfaces/routes.interface";
import AuthMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import validationMiddleware from "@/middlewares/validation.middleware";
import { MovieDTO } from "@/movies/dtos/movie.dto";
import { Paginations } from "@/dtos/Paginaion";

class MovieRoutes implements Routes {
   public path: string = '/movies';
   public router = Router();
   public movieController = new MovieController();
   constructor() {
    this.initializedRoutes();
   }
   private initializedRoutes(){
      this.router.get(`${this.path}/list`, validationMiddleware(Paginations, 'query'), this.movieController.list);
      this.router.get(`${this.path}/count`, this.movieController.count);
      this.router.get(`${this.path}/get/:id`, this.movieController.getById);
      this.router.post(`${this.path}/create`, AuthMiddleware.auth, validationMiddleware(MovieDTO, 'body'), this.movieController.create);
      this.router.put(`${this.path}/update/:id`, AuthMiddleware.auth, validationMiddleware(MovieDTO), this.movieController.update);
      this.router.delete(`${this.path}/delete/:id`, AuthMiddleware.auth, this.movieController.delete);
   }
}
export default MovieRoutes;