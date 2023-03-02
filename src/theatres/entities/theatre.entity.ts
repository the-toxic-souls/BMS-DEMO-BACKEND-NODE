import { Prop } from "@typegoose/typegoose";
import { Types } from "mongoose";

enum Category{
   AC = "a/c",
   NON_AC = "non_a/c",

}
export class Theatre {
  @Prop({ type: Types.ObjectId, required: true, auto: true })
  public _id: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true, index: true })
  public name: string;

  @Prop({ type: String, required: true, index: true })
  public address: string;

  @Prop({ type: String, required: false })
  public phone: string;

  @Prop({ type: Number, required: true })
  public seat: number;

  @Prop({ type: String, required: false, enum: ["balcony_class", "middle_class", "lower_class"], default: "balcony_class"})
  public seat_layouts: string[];

  @Prop({ type: String, required: false, enum: ["proscenium", "thrust", "arena", "found"], default: "found"})
  public types: string[];

  @Prop({ type: String, required: false, auto: true })
  public description: string;

}