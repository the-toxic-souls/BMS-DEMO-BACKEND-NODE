import {Routes} from '@/interfaces/routes.interface'
import { Router } from 'express';
import TheatreController from '@/theatres/theatre.controller';
import AuthMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { TheatreDTO } from '@/theatres/dtos/theatre.dto';
class TheatreRoutes implements Routes {
    public path: string = '/theatres'
    public router = Router();
    public theatreController = new TheatreController()
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}/list`, this.theatreController.list);
        this.router.get(`${this.path}/get/:id`, this.theatreController.getById);
        this.router.post(`${this.path}/create`, AuthMiddleware.auth, validationMiddleware(TheatreDTO, 'body'), this.theatreController.create);
        this.router.put(`${this.path}/update/:id`, AuthMiddleware.auth, validationMiddleware(TheatreDTO), this.theatreController.update);
        this.router.delete(`${this.path}/delete/:id`, AuthMiddleware.auth, this.theatreController.delete);
    }
}
export default TheatreRoutes;