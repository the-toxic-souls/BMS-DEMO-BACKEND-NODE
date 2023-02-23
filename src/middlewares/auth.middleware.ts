import { JWT_SECRET_KEY } from "@/config";
import { HttpException } from "@/exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import jwt,{JsonWebTokenError} from 'jsonwebtoken';

class AuthMiddleware {
    public auth = async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this.authenticate(req);
          next();
        } catch (error) {
          next(new HttpException(error.status, error.message));
        }
      };

    private authenticate = async (req: Request) => {
        const autorization = req.header('Authorization') ? req.header('Authorization').split(" ")[1] : null;
        if (!autorization) throw new HttpException(401, 'Bearer Token is required');
        const token = await this.verifyToken(autorization);
        console.log(token);

    }

    private verifyToken = async (token: string) => {
        const  tokenData = await jwt.verify(token, JWT_SECRET_KEY);
        return tokenData;
    }
}

export default new AuthMiddleware();