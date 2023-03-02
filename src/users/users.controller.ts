import { UserCreate } from "@/users/dtos/create.dto";
import { UserLogin } from  '@/users/dtos/login.dto'
import { Token, TokenData } from "@/interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";
import UserService from "@/users/users.service";

class UserController {
  public userService = new UserService();
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signupDto: UserCreate = req.body;
      const signUpID = await this.userService.signup(signupDto);
      res.status(201).json({ message: `${signUpID} created successfully` });
    } catch (error) {
      next(error);
    }
  };
  public signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signinDto: UserLogin = req.body;
      const token: Token = await this.userService.signin(signinDto);
      res.status(201).json({ message: token });
    } catch (error) {
      next(error);
    }
  };
  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data =<TokenData>req.tokenData;
      const logout_id = await this.userService.logout(data);
      res.status(201).json({ message:`${logout_id} logout successfully` });
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
