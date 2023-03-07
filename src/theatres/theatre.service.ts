import { TheatreDTO } from "@/theatres/dtos/theatre.dto";
import TheatreModel from "@/theatres/entities/theatre.entity";
import { ObjectId, Types } from "mongoose";
import { TheatreBase } from "@/theatres/interfaces/theatre.interface";
import CityModel from "@/cities/entities/city.entity";
import { HttpException } from "@/exceptions/HttpException";

class TheatreService {
    public list = async (): Promise<TheatreBase[]> => {
        return await TheatreModel.find({ deleted_at: null });
    }
    public create = async (theatreDTO: TheatreDTO): Promise<ObjectId> => {
        const city = await CityModel.findById(theatreDTO.city_id);
        if (!city) throw new HttpException(400, "City not found");
        const newData = await TheatreModel.create(theatreDTO);
        const theatre = await newData.save();
        return theatre._id;
    }

    public delete = async (id: string): Promise<void> => {
        const find = await TheatreModel.findById(new Types.ObjectId(id));
        if (!find) throw new HttpException(400, "id not found");
        const updateMovie = await TheatreModel.updateOne(
          { _id: new Types.ObjectId(id) },
          {
            $set: {
              deleted_at: new Date(Date.now()),
            },
          },
          { upsert: false, new: false }
        );
        if (!updateMovie.modifiedCount)
          throw new HttpException(409, `${find.id} already deleted`);
      };
}

export default TheatreService;