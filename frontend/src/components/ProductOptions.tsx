"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

// Types minimaux correspondant à la structure retournée par getProductByHandle
type OptionValue = { id: string; value: string };
type ProductOption = { id: string; title: string; values: OptionValue[] };
type VariantOption = { option_id: string; value: string };
type LocationLevel = { available_quantity: number };
type InventoryItem = { inventory: { location_levels: LocationLevel[] } };
type CalculatedPrice = { calculated_amount: number; currency_code: string };
type Variant = {
  id: string;
  title: string;
  options: VariantOption[];
  calculated_price?: CalculatedPrice;
  inventory_items?: InventoryItem[];
};

type ProductOptionsProps = {
  options: ProductOption[];
  variants: Variant[];
};

// Sélecteur d'options (taille, couleur...) : construit dynamiquement la sélection
// et résout la variante Medusa correspondante pour afficher prix et stock à jour.
export default function ProductOptions({ options, variants }: ProductOptionsProps) {
  const t = useTranslations("Product");
  const tCommon = useTranslations("Common");

  // Sélection initiale : première valeur de chaque option
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const option of options) {
      if (option.values[0]) {
        initial[option.id] = option.values[0].value;
      }
    }
    return initial;
  });

  // Trouve la variante dont TOUTES les options correspondent à la sélection actuelle
  const matchedVariant = useMemo(() => {
    return variants.find((variant) =>
      options.every((option) => {
        const variantOptionValue = variant.options.find(
          (o) => o.option_id === option.id
        )?.value;
        return variantOptionValue === selected[option.id];
      })
    );
  }, [selected, variants, options]);

  const price = matchedVariant?.calculated_price;
  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency_code.toUpperCase(),
        maximumFractionDigits: 0,
      }).format(price.calculated_amount)
    : null;

  const availableQuantity =
    matchedVariant?.inventory_items?.[0]?.inventory?.location_levels?.[0]
      ?.available_quantity ?? 0;

  return (
    <div>
      {formattedPrice && (
        <p className="font-display text-2xl font-bold">{formattedPrice}</p>
      )}

      {/* Sélecteurs pour chaque option (Taille, Couleur...) */}
      <div className="mt-6 space-y-5">
        {options.map((option) => (
          <div key={option.id}>
            <p className="text-sm font-medium">
              {t("selectOption", { option: option.title })}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isActive = selected[option.id] === value.value;
                return (
                  <button
                    key={value.id}
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [option.id]: value.value }))
                    }
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "border-charcoal bg-charcoal text-white dark:border-white dark:bg-white dark:text-charcoal"
                        : "border-foreground/20 hover:border-foreground/50"
                    }`}
                  >
                    {value.value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Indicateur de stock */}
      <p className="mt-6 text-sm text-foreground/60">
        {availableQuantity > 0
          ? t("inStock", { count: availableQuantity })
          : t("outOfStock")}
      </p>

      {/* Bouton d'ajout au panier — logique de panier branchée en Phase 2 (étape suivante) */}
      <button
        disabled={availableQuantity === 0}
        className="mt-4 w-full rounded-full bg-charcoal py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-charcoal"
      >
        {tCommon("addToCart")}
      </button>
    </div>
  );
}
