import { sdk } from "./medusa-client";

// Récupère les produits d'une catégorie (et de ses sous-catégories si elle en a),
// via son handle. Utilisé pour les pages catalogue (/bikes, /parts, /accessories).
export async function getProductsByCategoryHandle(handle: string) {
  // 1. Résoudre le handle en id de catégorie + récupérer ses enfants éventuels
  const { product_categories } = await sdk.store.category.list({
    handle,
    fields: "id,name,handle,*category_children",
  });

  const category = product_categories[0];
  if (!category) {
    return { category: null, products: [] };
  }

  // 2. Construire la liste des ids à interroger : le parent + ses enfants directs
  const categoryIds = [
    category.id,
    ...(category.category_children?.map((child) => child.id) ?? []),
  ];

  // 3. Récupérer les produits appartenant à l'un de ces ids
  const { products } = await sdk.store.product.list({
    category_id: categoryIds,
    fields: "id,title,handle,thumbnail,*variants.calculated_price",
    limit: 100,
  });

  return { category, products };
}
