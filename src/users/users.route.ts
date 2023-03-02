import { UserCreate } from "@/users/dtos/create.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";
import UserController from "@/users/users.controller";
import AuthMiddleware from "@/middlewares/auth.middleware";
import { UserLogin } from "@/users/dtos/login.dto";
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
      validationMiddleware(UserCreate, "body"),
      this.userController.signup
    );
    this.router.post(
      `${this.path}/signin`,
      validationMiddleware(UserLogin, "body"),
      this.userController.signin
    );
    this.router.get(
      `${this.path}/logout`,
      AuthMiddleware.auth,
      this.userController.logout
    );
  }
}

export default UserRoutes;
