import { NextFunction, Request, Response } from "express";
import { HttpException } from "@exceptions/HttpException";
// import { logger } from '@utils/logger';

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string | string[] =
      error.exception_message || "Something went wrong";

    !(error instanceof HttpException);
    res.status(status).json({ status: false, message });
  } catch (error) {
    next(error);
  }
};

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) =>
  next(new HttpException(404, `${req.path} not found`));

export { errorMiddleware, notFoundMiddleware };
