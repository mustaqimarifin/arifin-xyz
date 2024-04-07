import Redis from "ioredis";
import { isDev, intRedis, extRedis } from "../utils/env";

let rdx = new Redis(isDev ? intRedis : extRedis);

export { rdx };
