import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { GetStoreCurrencyConvertQuery } from "./validators";
import { CurrencyService } from "@modules/currency-convert/service";
import { TOKEN_CURRENCY_SERVICE } from "@modules/currency-convert";

export const GET = async (
  req: MedusaRequest<unknown, GetStoreCurrencyConvertQuery>,
  res: MedusaResponse
) => {
  const { amount, from, to } = req.validatedQuery;

  const currencyService = req.scope.resolve<CurrencyService>(
    TOKEN_CURRENCY_SERVICE
  );
  const converted = await currencyService.convert(from, to, amount);

  res.json({ amount, from, to, converted });
};
