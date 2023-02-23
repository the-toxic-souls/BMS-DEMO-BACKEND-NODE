import AuthController from "@/controller/auth.controller";
import MovieController from "@/controller/movies.controller";
import { Routes } from "@/interfaces/routes.interface";
import AuthMiddleware from "@/middlewares/auth.middleware";
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