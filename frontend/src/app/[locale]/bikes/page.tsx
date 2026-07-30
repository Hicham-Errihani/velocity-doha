import { getProductsByCategoryHandle } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { getTranslations } from "next-intl/server";

// Page catalogue "Vélos" (/bikes) : liste tous les produits des sous-catégories
// Route, VTT, Urbain, Enfant, Électrique.
export default async function BikesPage() {
  const t = await getTranslations("Navigation");
  const { products } = await getProductsByCategoryHandle("bikes");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold">{t("bikes")}</h1>
      <p className="mt-2 text-sm text-foreground/60">
        {products.length} {products.length > 1 ? "products" : "product"}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const variant = product.variants?.[0];
          const price = variant?.calculated_price;

          return (
            <ProductCard
              key={product.id}
              handle={product.handle}
              title={product.title}
              thumbnail={product.thumbnail}
              amount={price?.calculated_amount ?? null}
              currencyCode={price?.currency_code ?? null}
            />
          );
        })}
      </div>
    </div>
  );
}
