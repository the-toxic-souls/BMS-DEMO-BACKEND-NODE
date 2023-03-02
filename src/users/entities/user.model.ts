import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({
  schemaOptions: {
    collection: "users",
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
})
class User {
  @prop({ type: Schema.Types.ObjectId, required: true, auto: true })
  public _id: Schema.Types.ObjectId;

  @prop({ type: String })
  public name: string;

  @prop({ type: String, required: true, unique: true, index: true })
  public phone: string;

  @prop({ type: String, required: true, unique: true, index: true })
  public username: string;

  @prop({ type: String, required: true })
  public password: string;

  @prop({ type: String, default: false })
  public status: boolean;

  @prop({ type: Date })
  public deleted_at: Date;

  @prop({ type: Date })
  public restored_at: Date;
}

const UserModel = getModelForClass(User);

export default UserModel;
