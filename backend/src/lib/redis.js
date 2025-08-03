// import { Redis } from '@upstash/redis'
// const redis = Redis.fromEnv()

// await redis.set("foo", "bar");
// await redis.get("foo");

// import { createClient } from "redis"

import Redis from "ioredis"
import dotenv from "dotenv"

dotenv.config()

export const redis = new Redis(process.env.REDIS_URL);
await redis.set('foo', 'bar');