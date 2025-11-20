import {
  defineMiddlewares,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { GetStoreCurrencyConvertSchema } from "./store/currency/convert/validators";
import { exceptionFilter } from "@common/filters";

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
  errorHandler: exceptionFilter,
});
