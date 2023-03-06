import { TheatreDTO } from "@/theatres/dtos/theatre.dto";
import TheatreModel from "@/theatres/entities/theatre.entity";
import { ObjectId } from "mongoose";
import { TheatreBase } from "@/theatres/interfaces/theatre.interface";

class TheatreService {
    public list = async (): Promise<TheatreBase[]> => {
        return await TheatreModel.find();
    }
    public create = async (theatreDTO: TheatreDTO): Promise<ObjectId> => {
        const newData = await TheatreModel.create(theatreDTO);
        const theatre = await newData.save();
        return theatre._id;
    }
}

export default TheatreService;