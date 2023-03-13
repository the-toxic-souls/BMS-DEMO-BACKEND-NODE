import { getModelForClass, ModelOptions, Prop } from "@typegoose/typegoose";
import { Date, Document, Schema } from "mongoose";


class ShowTimes extends Document{
    @Prop({ type: Number, required: true })
    public price: number;

    @Prop({ type: String, required: true })
    show_time_start: string;

    @Prop({ type: String, required: true })
    show_time_end: string;
  }

@ModelOptions({
   schemaOptions: {
    collection: 'theatres_movies',
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
   }
})

class TheatresMovies {
    @Prop({ type: Schema.Types.ObjectId, required: true, auto: true })
    public _id: Schema.Types.ObjectId;

    @Prop({ type: Schema.Types.ObjectId, required: true, ref: 'movies'})
    public movie_id: Schema.Types.ObjectId;

    @Prop({ type: Schema.Types.ObjectId, required: true, ref: 'theatres'})
    public theatre_id: Schema.Types.ObjectId;

    @Prop({ type: Schema.Types.Mixed})
    public show_times: [ShowTimes];

    @Prop({ type: Date, required: true})
    public start_date: Date;

    @Prop({ type: Date, required: true})
    public end_date: Date;

    @Prop({ type: Date })
    public deleted_at: Date;

    @Prop({ type: Date })
    public restored_at: Date;
}

const TheatresMoviesModel = getModelForClass(TheatresMovies);
export default TheatresMoviesModel;