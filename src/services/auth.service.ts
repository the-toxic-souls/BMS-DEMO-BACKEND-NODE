import { SignupDto } from "@/dtos/auth.dto";
import { HttpException } from "@/exceptions/HttpException";
import AuthModel from "@/models/auth.model";
import {hash, genSalt, compare} from 'bcrypt';
class AuthService {
  public signup = async (signupDto: SignupDto) => {
    const { username, password } = signupDto;
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);
    const user = new AuthModel({
       username: username,
       password: hashedPassword
    })
    const signupID = await user.save()
    return signupID._id;
  };
  public signin = async (signinDto: SignupDto): Promise<boolean> => {
    const { username, password } = signinDto;
    const user = await AuthModel.findOne({username: username});
    if (user && await compare(password, user.password)) return true;
    throw new HttpException(400, "Invalid username or password");
  };
}

export default AuthService;
