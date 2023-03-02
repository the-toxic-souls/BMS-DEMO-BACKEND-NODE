import { NextFunction, Request, Response } from "express"
import TheatreService from "@/theatres/theatre.service";

class TheatreController{
    public theatreService = new TheatreService();
    public list = async (req: Request, res: Response, next: NextFunction) => {
        const f = await this.theatreService.list()
        res.status(200).json(f)
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        const f = await this.theatreService.list()
        res.status(200).json(f)
    }
}

export default TheatreController;