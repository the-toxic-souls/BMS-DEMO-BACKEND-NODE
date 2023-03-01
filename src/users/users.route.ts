import { UserDTO } from "@/users/dtos/auth.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";
import UserController from "@/users/users.controller";

class UserRoutes implements Routes {
  public path = "/auth";
  public router = Router();
  public userController = new UserController();
  constructor() {
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(UserDTO, "body"),
      this.userController.signup
    );
    this.router.post(
      `${this.path}/signin`,
      validationMiddleware(UserDTO, "body"),
      this.userController.signin
    );
  }
}

export default UserRoutes;
