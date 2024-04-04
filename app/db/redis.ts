import Redis from "ioredis";
import { isDev, intRedis, extRedis } from "../utils/env";

const rdx = new Redis(isDev ? intRedis : extRedis);

export { rdx };
