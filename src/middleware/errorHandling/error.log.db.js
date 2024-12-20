import dotenv from "dotenv";
dotenv.config();
import { createLogger, format, transports } from "winston";

import { MongoDB } from "winston-mongodb";

const dbString = process.env.MONGO_DB;
const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new MongoDB({
      db: dbString,
      collection: "Error",
      tryReconnect: true,
    }),
  ],
});

export default logger;
