import { TheatreDTO } from "@/theatres/dtos/theatre.dto";
import TheatreModel from "@/theatres/entities/theatre.entity";
import { ObjectId } from "mongoose";

class TheatreService {
    public list = async () => {
        return await TheatreModel.find();
    }
    public create = async (theatreDTO: TheatreDTO): Promise<ObjectId> => {
        const newData = await TheatreModel.create({
            name: theatreDTO.name,
            address: theatreDTO.address,
            phone: theatreDTO.phone,
            seat: theatreDTO.seat,
            seat_layouts: theatreDTO.seat_layouts,
            types: theatreDTO.types,
            category: theatreDTO.category,
            description: theatreDTO.description
        });
        const theatre = await newData.save();
        return theatre._id;
    }
}

export default TheatreService;