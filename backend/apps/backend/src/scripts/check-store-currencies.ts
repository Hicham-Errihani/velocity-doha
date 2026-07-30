/**
 * Script — Vérifier les devises configurées sur le store Medusa
 * Exécution : npx medusa exec ./src/scripts/check-store-currencies.ts
 */

import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function checkStoreCurrencies({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const logger = container.resolve("logger");

  const { data: stores } = await query.graph({
    entity: "store",
    fields: ["id", "name", "default_currency_code", "supported_currencies.*"],
  });

  logger.info(`Store: ${JSON.stringify(stores, null, 2)}`);
}
