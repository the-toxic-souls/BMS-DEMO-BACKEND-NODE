import { getModelForClass, ModelOptions, Prop } from "@typegoose/typegoose";
import { Date, Schema } from "mongoose";

@ModelOptions({
   schemaOptions: {
      collection: 'movies',
      versionKey: false,
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
   }
})
class Movie {
    @Prop({type: Schema.Types.ObjectId, required: true, auto: true })
    public _id: Schema.Types.ObjectId;

    @Prop({ type: String, required: true, unique: true, index: true })
    public name: string;

    @Prop({ type: Date, required: true, index: true, default: new Date()})
    public release_date: Date;

    @Prop({ type: Number, required: true, default: 0})
    public duration: number;

    @Prop({ type: Number, required: false, default: 0.0})
    public rating: number;

    @Prop({ type: String, required: false, default: []})
    public genre: string[];

    @Prop({ type: String, required: false, default: ''})
    public tagline: string;

    @Prop({ type: Date })
    public deleted_at: Date;

    @Prop({ type: Date })
    public restored_at: Date;
}

const MovieModel = getModelForClass(Movie)
export default MovieModel;