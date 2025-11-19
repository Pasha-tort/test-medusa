import { Modules } from "@medusajs/framework/utils";
import { ICurrencyProvider } from "./providers/icurrency-provider";

export class CurrencyService {
  private readonly _cachingService: any;
  constructor(private deps, private provider: ICurrencyProvider) {
    console.log(deps);
    this._cachingService = deps.caching;
  }

  async convert(from: string, to: string, amount: number) {
    const cacheKey = `currency-convert:${from}:${to}`;

    let rate = await this._cachingService.get({ key: cacheKey });

    if (!rate) {
      rate = await this.provider.getRate(from, to);
      await this._cachingService.set({ key: cacheKey, data: rate, ttl: 3600 });
    }

    return amount * rate;
  }
}
