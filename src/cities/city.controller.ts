import { NextFunction, Request, Response } from "express";
import CityService from "@/cities/city.service";
import { CityDTO } from "@/cities/dtos/city.dto";

class CityController {
    public cityService = new CityService();
    public list = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const getList = await this.cityService.list()
            res.status(200).json({status: true, data: getList})
        }catch(err){
            next(err);
        }
    }
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const cityDTO: CityDTO = req.body;
            const id = await this.cityService.create(cityDTO);
            res.status(200).json({status: true, message: `${id} created successfully`})
        }catch(err){
            next(err);
        }
    }
}
export default CityController;