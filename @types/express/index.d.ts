declare global {
  namespace Express {
    interface Request {
      tokenData?: Object;
    }
  }
}

export = Express;
