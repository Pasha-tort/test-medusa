import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { GetStoreCurrencyConvertQuery } from "./validators";
import { CurrencyService } from "@modules/currency-convert/service";
import { TOKEN_CURRENCY_SERVICE } from "@modules/currency-convert";
import { DomainError, HttpError } from "@common/exceptions";

export const GET = async (
  req: MedusaRequest<unknown, GetStoreCurrencyConvertQuery>,
  res: MedusaResponse,
  next
) => {
  const { amount, from, to } = req.validatedQuery;

  const currencyService = req.scope.resolve<CurrencyService>(
    TOKEN_CURRENCY_SERVICE
  );
  try {
    const converted = await currencyService.convert(from, to, amount);
    res.json({ amount, from, to, converted });
  } catch (error) {
    if (error instanceof HttpError === false) {
      return next(new HttpError(500, error.message));
    }
    next(error);
  }
};
