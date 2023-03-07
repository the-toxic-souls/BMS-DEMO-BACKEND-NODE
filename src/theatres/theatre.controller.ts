import { NextFunction, Request, Response } from "express"
import TheatreService from "@/theatres/theatre.service";
import { TheatreDTO } from "@/theatres/dtos/theatre.dto";
import { Theatre } from "@/theatres/interfaces/theatre.interface";
import { ObjectId } from "mongoose";

class TheatreController{
    public theatreService = new TheatreService();
    public list = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const getTheatres: Theatre[] = await this.theatreService.list()
            res.status(200).json({status: true, data: getTheatres})
        }catch(err){
            next(err);
        }
    }
    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = req.params.id;
            const getTheatre: Theatre = await this.theatreService.getById(id);
            res.status(200).json({status: true, data: getTheatre})
        }catch(err){
            next(err);
        }
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
    public update = async( req: Request, res: Response, next: NextFunction) => {
        try{
            const id = req.params.id;
            const theatreDTO: TheatreDTO = req.body;
            const updated_id = await this.theatreService.update(id, theatreDTO);
           res.status(201).json({status: true, message: `${updated_id} update successfully`})
        }catch (err) {
            console.log(err);

            next(err)
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