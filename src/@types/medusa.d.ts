import "express";
import { MedusaContainer } from "@medusajs/medusa";

declare module "express-serve-static-core" {
  interface Request {
    scope: MedusaContainer;
  }
}
