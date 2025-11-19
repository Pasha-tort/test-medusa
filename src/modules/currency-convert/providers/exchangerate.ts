import { ICurrencyProvider } from "./icurrency-provider";
import fetch from "node-fetch";

export class ExchangeRateAPIProvider implements ICurrencyProvider {
  async getRate(from: string, to: string): Promise<number> {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );
    if (!res.ok) throw new Error("External API error");
    const data = await res.json();
    const rate = data.rates[to];
    if (!rate) throw new Error(`Rate not found for ${to}`);
    return rate;
  }
}
