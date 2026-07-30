/**
 * Script — Vérifier les sales channels et shipping profiles existants
 * Prérequis pour le seed des produits de démonstration
 * Exécution : npx medusa exec ./src/scripts/check-sales-shipping.ts
 */

import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function checkSalesShipping({ container }: ExecArgs) {
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const logger = container.resolve("logger");

  const salesChannels = await salesChannelModuleService.listSalesChannels();
  logger.info(`Sales channels trouvés : ${JSON.stringify(salesChannels, null, 2)}`);

  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles();
  logger.info(`Shipping profiles trouvés : ${JSON.stringify(shippingProfiles, null, 2)}`);
}
