import { ICurrencyProvider } from "./interfaces/icurrency-provider";
import fetch from "node-fetch";

export class ExchangeRateService implements ICurrencyProvider {
  async getRate(from: string, to: string): Promise<number> {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/a31e6ac674d0df272832d3dc/latest/${from}`
    );
    if (!res.ok) throw new Error("External API error");
    const data = await res.json();
    const rate = data.rates[to];
    if (!rate) throw new Error(`Rate not found for ${to}`);
    return rate;
  }
}
