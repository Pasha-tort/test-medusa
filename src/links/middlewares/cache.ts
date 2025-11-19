import { Modules } from "@medusajs/framework/utils";
import { Request, Response, NextFunction } from "express";

export const cacheMiddleware = (
  extractValueForKey: (req: Request) => string,
  keyGenerator: (req: Request) => string,
  ttlSeconds: number
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cache = req.scope.resolve(Modules.CACHING);
    // const cache = container.resolve(Modules.CACHING)  // Modules импортируется из "@medusajs/framework/utils"
    const key = await cache.computeKey({ from, to, amount });
    const cached = await cache.get({ key });
    if (cached) {
      return cached;
    }
    // const key = keyGenerator(req);

    // try {
    //   const cached = await redisService.get(key);
    //   if (cached) return res.json(cached);
    //   const cacheAndSend = (body: any) => {
    //     redisService
    //       .set(key, body, ttlSeconds)
    //       .catch((err) => console.warn("Redis set error:", err));
    //     res.json(body);
    //   };

    //   // В коде:
    //   cacheAndSend(result);
    //   // const originalJson = res.json.bind(res);
    //   // res.json = async (body: any) => {
    //   //   await redisService.set(key, body, ttlSeconds);
    //   //   return originalJson(body);
    //   // };
    //   next();
    // } catch (err) {
    //   console.error("Cache middleware error:", err);
    //   next();
    // }
  };
};
