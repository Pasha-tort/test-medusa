import { Router } from "express";
import axios from "axios";
import { cacheMiddleware } from "./middlewares/cache";

type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY"; // допустимые валюты

const ALLOWED_CURRENCIES: CurrencyCode[] = ["USD", "EUR", "GBP", "JPY"];

interface ConvertQuery {
  amount: number;
  from: CurrencyCode;
  to: CurrencyCode;
}

const router = Router();

// middleware кеширования на 1 минуту
router.get(
  "/store/currency/convert",
  cacheMiddleware((req) => `currency:${req.query.from}:${req.query.to}`, 3600),
  async (req, res) => {
    try {
      // Валидация параметров
      const { amount, from, to } = req.query as Record<string, string>;

      if (!amount || !from || !to) {
        return res
          .status(400)
          .json({ error: "Missing required query parameters" });
      }

      const parsedAmount = Number(amount);
      if (isNaN(parsedAmount)) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      if (
        !ALLOWED_CURRENCIES.includes(from as CurrencyCode) ||
        !ALLOWED_CURRENCIES.includes(to as CurrencyCode)
      ) {
        return res.status(400).json({ error: "Invalid currency code" });
      }

      // Вызов внешнего API
      const apiKey = process.env.EXCHANGERATE_API_KEY;
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${parsedAmount}`;

      const response = await axios.get(url);
      const data = response.data;

      if (data.result !== "success") {
        return res
          .status(502)
          .json({ error: "Failed to fetch conversion rate" });
      }

      res.json({
        amount: parsedAmount,
        from,
        to,
        converted: data.conversion_result,
        rate: data.conversion_rate,
      });
    } catch (err: any) {
      console.error("Currency convert error:", err.message);
      res
        .status(500)
        .json({ error: "Internal server error or external API unavailable" });
    }
  }
);

export default router;
