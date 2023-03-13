import { dbConnection } from "@/database";
import winston, { format } from "winston";
import "winston-mongodb";

export default {
    transport: new winston.transports.MongoDB({
      level: "info",
      db: dbConnection,
      collection: "logs",
      options: {
        useUnifiedTopology: true,
      },
      decolorize: true,
    }),
    formatter: format(info => {
        if (info.stack) {
            info.metadata = info.stack.split('\n').reduce((stack, line) => {
              const parts = /^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i.exec(line);
              parts &&
                stack.push({
                  file: parts[2],
                  methodName: parts[1] || '<unknown>',
                  arguments: [],
                  lineNumber: +parts[3],
                  column: parts[4] ? +parts[4] : null,
                });

              return stack;
            }, []);
          }
          return info;
      })(),
}