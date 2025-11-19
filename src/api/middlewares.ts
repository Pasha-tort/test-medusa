import {
  defineMiddlewares,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { GetStoreCurrencyConvertSchema } from "./store/currency/convert/validators";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/currency/convert",
      methods: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetStoreCurrencyConvertSchema, {}),
      ],
    },
  ],
});
