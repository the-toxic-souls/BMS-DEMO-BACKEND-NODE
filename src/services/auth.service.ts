import { SignupDto } from "@/dtos/auth.dto";
import AuthModel from "@/models/auth.model";

class AuthService {
  public signup = async (signupDto: SignupDto) => {
    const signupID = await AuthModel.create(signupDto);
    return signupID._id;
  };
}

export default AuthService;
