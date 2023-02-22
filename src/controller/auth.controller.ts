import { SignupDto } from "@/dtos/auth.dto";
import AuthService from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";

class AuthController {
  public authService = new AuthService();
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signupDto: SignupDto = req.body;
      const signUpID = await this.authService.signup(signupDto);
      res.status(201).json({ message: `${signUpID} created successfully` });
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
