import winston, { format } from "winston";
export default {
  transport: new winston.transports.Console({
    level: "info",
    format: format.combine(
      format.colorize({ level: true }),
      format.printf(
        ({ timestamp, level, message, stack }) =>
          `${timestamp} ${level}: ${stack || message}`
      )
    ),
  }),
};
