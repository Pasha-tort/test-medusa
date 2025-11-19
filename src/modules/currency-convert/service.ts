import { Modules } from "@medusajs/framework/utils";
import { ExchangeRateService } from "./services";

type InjectedDependencies = {
  exchangeRateService: ExchangeRateService;
  caching: typeof Modules.CACHING;
};

export class CurrencyService {
  protected readonly _cachingService: any;
  protected readonly _exchangeRateService: ExchangeRateService;
  constructor(deps: InjectedDependencies) {
    this._cachingService = deps.caching;
    this._exchangeRateService = deps.exchangeRateService;
  }

  async convert(from: string, to: string, amount: number) {
    const cacheKey = `currency-convert:${from}:${to}`;

    let rate = await this._cachingService.get({ key: cacheKey });

    if (!rate) {
      rate = await this._exchangeRateService.getRate(from, to);
      await this._cachingService.set({ key: cacheKey, data: rate, ttl: 3600 });
    }

    return amount * rate;
  }
}
