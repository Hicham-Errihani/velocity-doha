import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

// Supprime les produits de démo Medusa (T-Shirt, Sweatshirt, Sweatpants, Shorts)
// qui ne concernent pas Velocity Doha.
export default async function removeDemoProducts({ container }: ExecArgs) {
  const productModuleService = container.resolve(Modules.PRODUCT);

  const handlesToDelete = ["t-shirt", "sweatshirt", "sweatpants", "shorts"];

  const [products] = await productModuleService.listAndCountProducts(
    {},
    { take: 100, select: ["id", "title", "handle"] }
  );

  const toDelete = products.filter((p) => handlesToDelete.includes(p.handle));
  console.log("Produits à supprimer trouvés:", toDelete.length);

  for (const product of toDelete) {
    await productModuleService.deleteProducts(product.id);
    console.log(`🗑️  Supprimé : ${product.title} (${product.handle})`);
  }

  console.log("Terminé.");
}
