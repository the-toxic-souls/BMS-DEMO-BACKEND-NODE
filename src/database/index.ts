import { MONGO_DB, MONGO_HOST, MONGO_PORT } from "@/config";

export const dbConnection = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;