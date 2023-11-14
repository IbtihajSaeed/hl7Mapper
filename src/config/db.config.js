import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();
//Database credentials
const redisClient = new Redis({
    port: 6379, // Redis port
    host: "test", // Redis host
    username: "test", // needs Redis >= 6
    password: "test",
    db: 1, // Defaults to 1
  });


export default redisClient;