import winston from "winston";
import DailyRotateFile from 'winston-daily-rotate-file'
export default {
    transport: new DailyRotateFile({
      level: 'info',
      filename: '%DATE%.log',
      dirname: 'log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: 30,
      json: false,
      zippedArchive: true,
      format: winston.format.combine(
        winston.format.uncolorize(),
        winston.format.printf(({ timestamp, level, message, stack }) => `${timestamp} ${level}: ${stack || message}`),      )

    })
}