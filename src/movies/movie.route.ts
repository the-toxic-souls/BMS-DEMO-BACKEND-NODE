import MovieController from "@/movies/movies.controller";
import { Routes } from "@/interfaces/routes.interface";
import AuthMiddleware from "@/auth/auth.middleware";
import { Router } from "express";

class MovieRoutes implements Routes {
   public path: string = '/movies';
   public router = Router();
   public movieController = new MovieController();
   constructor() {
    this.initializedRoutes();
   }
   private initializedRoutes(){
      this.router.get(`${this.path}/list`, AuthMiddleware.auth, this.movieController.getAllMovie);
   }
}
export default MovieRoutes;