import { getProductByHandle } from "@/lib/products";
import ProductOptions from "@/components/ProductOptions";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

// Fiche produit : galerie image, titre, description, sélecteur d'options,
// prix et stock dynamiques (gérés côté client par ProductOptions).
export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const t = await getTranslations("Product");

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Galerie image (placeholder tant que les vraies photos ne sont pas disponibles) */}
        <div className="aspect-square overflow-hidden rounded-lg bg-foreground/5">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={800}
              height={800}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-foreground/40">
              {product.title}
            </div>
          )}
        </div>

        {/* Infos produit */}
        <div>
          <h1 className="font-display text-3xl font-bold">{product.title}</h1>

          <div className="mt-6">
            <ProductOptions
              options={product.options ?? []}
              variants={product.variants ?? []}
            />
          </div>

          {product.description && (
            <div className="mt-10 border-t border-foreground/10 pt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
                {t("description")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
