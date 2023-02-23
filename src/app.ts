import express from "express";
import cors from "cors";
import hpp from "hpp";
import morgan from 'morgan';
import { NODE_ENV, PORT } from "@config";
import { connect, set } from "mongoose";
import { dbConnection } from "@/database";
import { Routes } from "@interfaces/routes.interface";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/error.middleware";
import {logger, stream} from "./middlewares/logger.middleware";
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToDB();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }
  private async connectToDB() {
    set("strictQuery", false);
    await connect(dbConnection);
    logger.info(`💾 Database Connected`);
    logger.info(`=================================`);
  }
  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }
  private initializeMiddleware() {
    this.app.use(morgan('dev',{stream,skip: function (req, res) { return res.statusCode >= 500 }}))
    this.app.use(cors());
    this.app.use(hpp()); // HPP puts array parameters in req.query and/or req.body aside and just selects the last parameter value. You add the middleware and you are done.
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeErrorHandling() {
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
    process.on('uncaughtException', e => { logger.error(e), process.exit(1)});
    process.on('unhandledRejection', e => logger.error(e));
  }
}

export default App;
