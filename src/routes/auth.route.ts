import AuthController from "@/controller/auth.controller";
import { SignupDto } from "@/dtos/auth.dto";
import { Routes } from "@/interfaces/routes.interface";
import validationMiddleware from "@/middlewares/validation.middleware";
import { Router } from "express";

class AuthRoutes implements Routes {
  public path = "/auth";
  public router = Router();
  public authController = new AuthController();
  constructor() {
    this.initializedRoutes();
  }
  private initializedRoutes() {
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware(SignupDto, "body"),
      this.authController.signup
    );
  }
}

export default AuthRoutes;
