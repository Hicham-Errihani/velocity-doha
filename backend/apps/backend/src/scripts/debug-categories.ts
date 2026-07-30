/**
 * Script de debug — Lister toutes les catégories et leur nombre exact
 * Exécution : npx medusa exec ./src/scripts/debug-categories.ts
 */

import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function debugCategories({ container }: ExecArgs) {
  const productModuleService = container.resolve(Modules.PRODUCT);
  const logger = container.resolve("logger");

  const categories = await productModuleService.listProductCategories(
    {},
    { select: ["id", "name", "parent_category_id"], take: 100 }
  );

  logger.info(`Nombre total de catégories récupérées : ${categories.length}`);
  for (const c of categories) {
    logger.info(`- "${c.name}" (id: ${c.id}, parent: ${c.parent_category_id})`);
  }
}
