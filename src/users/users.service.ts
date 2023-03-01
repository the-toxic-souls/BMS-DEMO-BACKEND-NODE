import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "@/config";
import { UserDTO } from "@/users/dtos/auth.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Token, TokenData } from "@/interfaces/auth.interface";
import AuthModel from "@/users/entities/auth.model";
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
class UserService {
  public signup = async (signupDto: UserDTO) => {
    const { username, password } = signupDto;
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    const user = new AuthModel({
      username: username,
      password: hashedPassword,
    });
    const signupID = await user.save();
    return signupID._id;
  };
  public signin = async (signinDto: UserDTO): Promise<Token> => {
    const { username, password } = signinDto;
    const user = await AuthModel.findOne({ username: username });
    const token: string = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET_KEY,
      {
        expiresIn: +JWT_EXPIRES_IN,
      }
    );
    if (user && (await compare(password, user.password))) {
      await AuthModel.updateOne({ _id: user._id }, { status: true });
      return { access_token: token };
    }
    throw new HttpException(400, "Invalid username or password");
  };
  public logout = async (tokenData: TokenData): Promise<string> => {
    await AuthModel.updateOne(
      { _id: new mongoose.Types.ObjectId(tokenData.id) },
      { status: false }
    );
    return tokenData.id;
  };
}

export default UserService;
