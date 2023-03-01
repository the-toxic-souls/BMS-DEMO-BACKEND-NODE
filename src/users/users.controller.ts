import { UserDTO } from "@/users/dtos/auth.dto";
import { Token } from "@/interfaces/auth.interface";
import { NextFunction, Request, Response } from "express";
import UserService from "@/users/users.service";

class UserController {
  public userService = new UserService();
  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signupDto: UserDTO = req.body;
      const signUpID = await this.userService.signup(signupDto);
      res.status(201).json({ message: `${signUpID} created successfully` });
    } catch (error) {
      next(error);
    }
  };
  public signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signinDto: UserDTO = req.body;
      const token: Token = await this.userService.signin(signinDto);
      res.status(201).json({ message: token });
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
