import { z } from "zod";
import { codes } from "currency-codes";

const isoCurrencyCodes = new Set(codes());
const isCurrency = z.string().refine((code) => isoCurrencyCodes.has(code), {
  message: "Invalid ISO 4217 currency code",
});

export const GetStoreCurrencyConvertSchema = z.object({
  amount: z.coerce.number().positive(),
  from: isCurrency,
  to: isCurrency,
});
export type GetStoreCurrencyConvertQuery = z.infer<
  typeof GetStoreCurrencyConvertSchema
>;
