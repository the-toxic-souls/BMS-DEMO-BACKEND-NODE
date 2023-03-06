import { NextFunction, Request, Response } from "express"
import TheatreService from "@/theatres/theatre.service";
import { TheatreDTO } from "@/theatres/dtos/theatre.dto";

class TheatreController{
    public theatreService = new TheatreService();
    public list = async (req: Request, res: Response, next: NextFunction) => {
        const f = await this.theatreService.list()
        res.status(200).json(f)
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const theatreDTO: TheatreDTO = req.body;
            const id = await this.theatreService.create(theatreDTO)
            res.status(201).json({status: true, message: `${id} created successfully` })
        }catch(err){
            next(err);
        }
    }
}

export default TheatreController;