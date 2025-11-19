import { Module, Modules } from "@medusajs/framework/utils";
import { CurrencyService } from "./service";

export const TOKEN_CURRENCY_SERVICE = "CURRENCY_SERVICE";
export default Module(TOKEN_CURRENCY_SERVICE, {
  service: CurrencyService,
});
