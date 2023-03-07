import { TheatreDTO } from "@/theatres/dtos/theatre.dto";
import TheatreModel from "@/theatres/entities/theatre.entity";
import { ObjectId } from "mongoose";
import { TheatreBase } from "@/theatres/interfaces/theatre.interface";
import CityModel from "@/cities/entities/city.entity";
import { HttpException } from "@/exceptions/HttpException";

class TheatreService {
    public list = async (): Promise<TheatreBase[]> => {
        return await TheatreModel.find();
    }
    public create = async (theatreDTO: TheatreDTO): Promise<ObjectId> => {
        const city = await CityModel.findById(theatreDTO.city_id);
        if (!city) throw new HttpException(400, "City not found");
        const newData = await TheatreModel.create(theatreDTO);
        const theatre = await newData.save();
        return theatre._id;
    }
}

export default TheatreService;