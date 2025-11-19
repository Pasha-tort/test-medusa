export interface ICurrencyProvider {
  getRate(from: string, to: string): Promise<number>;
}
