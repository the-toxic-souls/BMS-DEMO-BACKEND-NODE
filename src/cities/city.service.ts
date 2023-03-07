import CityModel from "@/cities/entities/city.entity";
import { CityDTO } from "@/cities/dtos/city.dto";
import { ObjectId } from "mongoose";

class CityService {

    public list = async () => {
       return CityModel.find()
    }

    public create = async (cityDTO: CityDTO): Promise<string> => {
        const newData = await CityModel.create(cityDTO);
        const city = await newData.save();
        return city._id;
    }
}

export default CityService;