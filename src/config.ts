import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
  return {
    serverPort: process.env.SERVER_PORT,
    apiKey: process.env.API_KEY,
    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      connection: process.env.MONGO_CONNECTION,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      db: process.env.REDIS_DB,
      password: process.env.REDIS_PASSWORD,
      prefix: process.env.REDIS_PREFIX,
    },
    jwtSecret: process.env.JWT_SECRET,
    kafka: {
      brokerUrl: process.env.KAFKA_BROKER_URL,
      clientId: process.env.KAFKA_CLIENT_ID,
      groupId: process.env.KAFKA_GROUP_ID
    },
  };
});
