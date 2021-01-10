import config from "../../config";
import * as redis from "redis";
import { promisify } from "util";

export default class Cache {

  private static instance: Cache = null;

  private client: redis.RedisClient = null;

  static getInstance() {
    if (Cache.instance == null) Cache.instance = new Cache();
    return Cache.instance;
  }

  private constructor() {
    const options: redis.ClientOpts = {
      host: config.redis.host,
      password: config.redis.password
    };
    this.client = redis.createClient(options);
  }

  async get(key: string) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return await getAsync(key);
  }

  set(key: string, value: string) {
    this.client.set(key, value);
  }

  async clear(pattern: string = "*") {
    const keysAsync = promisify(this.client.keys).bind(this.client);
    const keys = await keysAsync(pattern);
    if (keys.length != 0) this.client.del(keys);
  }
}