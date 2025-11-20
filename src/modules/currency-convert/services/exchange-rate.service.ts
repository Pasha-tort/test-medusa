import { DomainError } from "@common/exceptions";
import { ICurrencyProvider } from "./interfaces/icurrency-provider";
import fetch from "node-fetch";

export class ExchangeRateService implements ICurrencyProvider {
  async getRate(from: string, to: string): Promise<number> {
    // new DomainError("External API request error");
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/latest/${from}`
    ).catch((error) => {
      console.error(error);
      throw new DomainError("External API request error");
    });
    if (!res.ok) throw new DomainError("External API error");
    const data = await res.json();
    const rate = data.conversion_rates[to];
    if (!rate) throw new DomainError(`Rate not found for ${to}`);
    return rate;
  }
}
