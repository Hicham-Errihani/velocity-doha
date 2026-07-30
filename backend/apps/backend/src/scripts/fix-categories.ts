import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

// Script de correction : renomme les handles de catégories vélo en anglais
// (au lieu du français initial) et supprime les catégories de démo Medusa
// (Shirts, Sweatshirts, Pants, Merch) qui ne concernent pas Velocity Doha.
export default async function fixCategories({ container }: ExecArgs) {
  const productModuleService = container.resolve(Modules.PRODUCT);

  const handleRenames: Record<string, string> = {
    "vélos": "bikes",
    "route": "road",
    "vtt": "mountain",
    "urbain": "urban",
    "enfant": "kids",
    "électrique": "electric",
    "pièces-détachées": "parts",
    "freins": "brakes",
    "transmission": "drivetrain",
    "roues": "wheels",
    "selles": "saddles",
    "accessoires": "accessories",
    "casques": "helmets",
    "éclairage": "lights",
    "sacoches": "bags",
    "entretien": "maintenance",
  };

  const handlesToDelete = ["shirts", "sweatshirts", "pants", "merch"];

  const result = await productModuleService.listAndCountProductCategories(
    {},
    { take: 100, select: ["id", "name", "handle"] }
  );

  console.log("DEBUG - type de résultat:", typeof result);
  console.log("DEBUG - est un tableau:", Array.isArray(result));
  console.log("DEBUG - result brut:", JSON.stringify(result).slice(0, 300));

  const categories = Array.isArray(result) ? result[0] : (result as any).data;

  console.log("DEBUG - nombre de catégories trouvées:", categories?.length);

  for (const category of categories) {
    console.log(`DEBUG - handle actuel: "${category.handle}"`);
    const newHandle = handleRenames[category.handle];
    if (newHandle) {
      await productModuleService.updateProductCategories(category.id, {
        handle: newHandle,
      });
      console.log(`✅ Renommé : ${category.handle} -> ${newHandle}`);
    }
  }

  const toDelete = categories.filter((c: any) => handlesToDelete.includes(c.handle));
  console.log("DEBUG - catégories à supprimer trouvées:", toDelete.length);
  for (const category of toDelete) {
    await productModuleService.deleteProductCategories(category.id);
    console.log(`🗑️  Supprimé : ${category.name} (${category.handle})`);
  }

  console.log("Terminé.");
}
