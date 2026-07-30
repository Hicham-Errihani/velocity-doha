/**
 * Script de seed — Création des catégories produits Velocity Doha
 * Structure : Vélos / Pièces détachées / Accessoires (avec sous-catégories)
 *
 * Exécution : npx medusa exec ./src/scripts/seed-categories.ts
 */

import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

// Définition de la structure : catégorie parente -> liste de sous-catégories
const categoryStructure: Record<string, string[]> = {
  "Vélos": ["Route", "VTT", "Urbain", "Enfant", "Électrique"],
  "Pièces détachées": ["Freins", "Transmission", "Roues", "Selles"],
  "Accessoires": ["Casques", "Éclairage", "Sacoches", "Entretien"],
};

export default async function seedCategories({ container }: ExecArgs) {
  // Récupération du service produit Medusa (gère aussi les catégories)
  const productModuleService = container.resolve(Modules.PRODUCT);

  const logger = container.resolve("logger");

  for (const [parentName, children] of Object.entries(categoryStructure)) {
    // Vérifier si la catégorie parente existe déjà (évite les doublons si on relance le script)
    const existingParents = await productModuleService.listProductCategories({
      name: parentName,
    });

    let parentCategory = existingParents[0];

    if (!parentCategory) {
      parentCategory = await productModuleService.createProductCategories({
        name: parentName,
        is_active: true,
      });
      logger.info(`Catégorie parente créée : ${parentName}`);
    } else {
      logger.info(`Catégorie parente déjà existante, ignorée : ${parentName}`);
    }

    // Création des sous-catégories liées au parent
    for (const childName of children) {
      const existingChildren = await productModuleService.listProductCategories({
        name: childName,
        parent_category_id: parentCategory.id,
      });

      if (existingChildren.length > 0) {
        logger.info(`  Sous-catégorie déjà existante, ignorée : ${childName}`);
        continue;
      }

      await productModuleService.createProductCategories({
        name: childName,
        is_active: true,
        parent_category_id: parentCategory.id,
      });
      logger.info(`  Sous-catégorie créée : ${childName} (parent: ${parentName})`);
    }
  }

  logger.info("Seed des catégories terminé.");
}
