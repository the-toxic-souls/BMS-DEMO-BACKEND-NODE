import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";
import CityController from "@/cities/city.controller";
import AuthMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { CityDTO } from "@/cities/dtos/city.dto";

class CityRoute implements Routes{
    public path: string = "/cities";
    public router = Router();
    public cityController = new CityController();
    constructor() {
        this.initializeRoures();
    }
    private initializeRoures(){
        this.router.get(`${this.path}/list`, this.cityController.list);
        this.router.post(`${this.path}/create`, AuthMiddleware.auth, validationMiddleware(CityDTO, "body"), this.cityController.create);
    }
}

export default CityRoute;