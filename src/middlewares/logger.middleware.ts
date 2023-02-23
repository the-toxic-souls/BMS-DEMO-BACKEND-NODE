import { LOG_OPTIONS, NODE_ENV } from '@/config'
import winston from 'winston'
import logHandlers from '@handlers/logging'
import Transport from 'winston-transport'
const logOption: string[] = JSON.parse(LOG_OPTIONS);
const transports: Transport[] = [];
logOption.forEach(option => {
    transports.push(logHandlers[option].transport)
})

const level = () => {
  const env = NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
  winston.format.errors({ stack: true})
)

const logger = winston.createLogger({
    level: level(),
    format: format,
    transports: transports,
    handleExceptions: true,
    handleRejections: true,
})

const stream = {
    write: (message: string) => {
      logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
  };

export {logger, stream};