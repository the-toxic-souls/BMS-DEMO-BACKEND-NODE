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
class Auth {
  @prop({ type: Schema.Types.ObjectId, required: true, auto: true })
  public _id: Schema.Types.ObjectId;

  @prop({ type: String, required: true })
  username: string;

  @prop({ type: String, required: true })
  password: string;

  @prop({ type: Date })
  public deleted_at: Date;

  @prop({ type: Date })
  public restored_at: Date;
}

const AuthModel = getModelForClass(Auth);

export default AuthModel;
