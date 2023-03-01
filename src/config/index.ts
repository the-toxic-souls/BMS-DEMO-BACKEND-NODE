import { config } from 'dotenv';
config({ path: `.env` });

export const {
  NODE_ENV,
  PORT,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
  LOG_OPTIONS,
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN
} = process.env;