import { NextFunction, Request, Response } from "express"
import TheatreService from "@/theatres/theatre.service";
import { TheatreDTO } from "@/theatres/dtos/theatre.dto";
import { TheatreBase } from "@/theatres/interfaces/theatre.interface";
import { ObjectId } from "mongoose";

class TheatreController{
    public theatreService = new TheatreService();
    public list = async (req: Request, res: Response, next: NextFunction) => {
        const getList: TheatreBase[] = await this.theatreService.list()
        res.status(200).json({status: true, data: getList})
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
    public delete = async( req: Request, res: Response, next: NextFunction) => {
        try{
            const id = req.params.id;
            await this.theatreService.delete(id);
           res.status(201).json({status: true, message: `${id} deleted successfully`})
        }catch (err) {
            next(err)
        }
    }
}

export default TheatreController;