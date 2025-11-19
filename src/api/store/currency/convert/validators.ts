import { z } from "zod";

const currencyValidator = z.enum(["USD", "EUR"]);

export const GetStoreCurrencyConvertSchema = z.object({
  amount: z.coerce.number().positive(),
  from: currencyValidator,
  to: currencyValidator,
});
export type GetStoreCurrencyConvertQuery = z.infer<
  typeof GetStoreCurrencyConvertSchema
>;
