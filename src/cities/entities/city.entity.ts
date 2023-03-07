import { getModelForClass, ModelOptions, Prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@ModelOptions({
    schemaOptions: {
        collection: 'cities',
        versionKey: false,
        timestamps: {
            createdAt: 'created_at'
        }
    }
})
class City {
    @Prop({ type: Schema.Types.ObjectId, required: true, auto: true })
    public _id: string;

    @Prop({ type: String, required: true, index: true })
    public name: string;
}

const CityModel = getModelForClass(City);
export default CityModel;