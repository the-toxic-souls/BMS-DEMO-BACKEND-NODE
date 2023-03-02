import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "@/config";
import { UserCreate } from "@/users/dtos/create.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Token, TokenData } from "@/interfaces/auth.interface";
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserLogin } from "./dtos/login.dto";
import UserModel from "@/users/entities/user.model";
class UserService {
  public signup = async (userCreate: UserCreate) => {
    const { name, phone, username, password } = userCreate;
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    const user = new UserModel({
      name: name,
      phone: phone,
      username: username,
      password: hashedPassword,
    });
    const signupData = await user.save();
    return signupData._id;
  };
  public signin = async (signinDto: UserLogin): Promise<Token> => {
    const { username, password } = signinDto;
    const user = await UserModel.findOne({ username: username });
    const token: string = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET_KEY,
      {
        expiresIn: +JWT_EXPIRES_IN,
      }
    );
    if (user && (await compare(password, user.password))) {
      await UserModel.updateOne({ _id: user._id }, { status: true });
      return { access_token: token };
    }
    throw new HttpException(400, "Invalid username or password");
  };
  public logout = async (tokenData: TokenData): Promise<string> => {
    await UserModel.updateOne(
      { _id: new mongoose.Types.ObjectId(tokenData.id) },
      { status: false }
    );
    return tokenData.id;
  };
}

export default UserService;
