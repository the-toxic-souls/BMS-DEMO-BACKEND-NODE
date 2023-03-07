import { getModelForClass, ModelOptions, Prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@ModelOptions({
  schemaOptions: {
     collection: 'theatres',
     versionKey: 'test',
     timestamps: {
       createdAt: 'created_at',
       updatedAt: 'updated_at'
     }
  }
})

export class Theatre {
  @Prop({ type: Schema.Types.ObjectId, required: true, auto: true })
  public _id: Schema.Types.ObjectId;

  @Prop({ type: String, required: true, unique: true, index: true })
  public name: string;

  @Prop({ type: String, required: true, index: true })
  public address: string;

  @Prop({ type: String, required: false })
  public phone: string;

  @Prop({ type: Number, required: true })
  public seat: number;

  @Prop({ type: String, required: false, enum: ["balcony_class", "middle_class", "lower_class"], default: "balcony_class", index: true })
  public seat_layouts: string;

  @Prop({ type: String, required: false, enum: ["proscenium", "thrust", "arena", "found"], default: "found", index: true})
  public types: string;

  @Prop({ type: String, required: false, enum: ["ac", "non-ac", "both"], default: "non-a/c", index: true })
  public category: string;

  @Prop({ type: String, required: false })
  public description: string;

  @Prop({ type: Schema.Types.ObjectId, ref: 'cities'})
  city_id: string;

  @Prop({ type: Date })
  public deleted_at: Date;

  @Prop({ type: Date })
  public restored_at: Date;

}

const TheatreModel = getModelForClass(Theatre);
export default TheatreModel;