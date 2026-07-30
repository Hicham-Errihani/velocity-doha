import { getProductsByCategoryHandle } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { getTranslations } from "next-intl/server";

// Page catalogue "Accessoires" (/accessories) : liste tous les produits des
// sous-catégories Casques, Éclairage, Sacoches, Entretien.
export default async function AccessoriesPage() {
  const t = await getTranslations("Navigation");
  const tCommon = await getTranslations("Common");
  const { products } = await getProductsByCategoryHandle("accessories");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="font-display text-3xl font-bold">{t("accessories")}</h1>
      <p className="mt-2 text-sm text-foreground/60">
        {tCommon("productCount", { count: products.length })}
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
