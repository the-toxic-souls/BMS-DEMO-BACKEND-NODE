import { TheatreDTO } from "@/theatres/dtos/theatre.dto";
import TheatreModel from "@/theatres/entities/theatre.entity";
import { ObjectId, Types } from "mongoose";
import { Theatre } from "@/theatres/interfaces/theatre.interface";
import CityModel from "@/cities/entities/city.entity";
import { HttpException } from "@/exceptions/HttpException";

class TheatreService {
    public list = async (): Promise<Theatre[]> => {
        return await TheatreModel.find({ deleted_at: null });
    }
    public getById = async (id: string): Promise<Theatre> => {
        const theatre: Theatre = await TheatreModel.findById({_id: new Types.ObjectId(id), deleted_at: null});
        if (!theatre) throw new HttpException(400, "theatre not found")
        return theatre;
    }
    public create = async (theatreDTO: TheatreDTO): Promise<ObjectId> => {
        const city = await CityModel.findById(theatreDTO.city_id);
        if (!city) throw new HttpException(400, "City not found");
        const newData = await TheatreModel.create(theatreDTO);
        const theatre = await newData.save();
        return theatre._id;
    }
    public update = async (
        id: string,
        theatreDTO: TheatreDTO
      ): Promise<ObjectId> => {
        const theatre = await this.getById(id);
        if (!theatre ) throw new HttpException(400, "Theatre not found")
        const getUpdatedData = await TheatreModel.findByIdAndUpdate(
          new Types.ObjectId(id),
          theatreDTO
        );
        return getUpdatedData._id;
      };
    public delete = async (id: string): Promise<void> => {
        const theatre = await this.getById(id);
        if (!theatre) throw new HttpException(400, "theatre not found");
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
          throw new HttpException(409, `${id} already deleted`);
      };
}

export default TheatreService;