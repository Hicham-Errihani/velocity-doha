/**
 * Script — Configurer QAR comme devise principale du store
 * (garde EUR/USD en devises secondaires pour affichage multi-devises)
 * Exécution : npx medusa exec ./src/scripts/set-qar-currency.ts
 */

import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function setQarCurrency({ container }: ExecArgs) {
  const storeModuleService = container.resolve(Modules.STORE);
  const logger = container.resolve("logger");

  const [store] = await storeModuleService.listStores();

  await storeModuleService.updateStores(store.id, {
    supported_currencies: [
      { currency_code: "qar", is_default: true },
      { currency_code: "usd", is_default: false },
      { currency_code: "eur", is_default: false },
    ],
  });

  logger.info("Devise principale mise à jour : QAR (Riyal Qatari)");
  logger.info("Devises secondaires conservées : USD, EUR");
}
