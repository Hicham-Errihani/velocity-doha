import { Link } from "@/i18n/navigation";
import Image from "next/image";

// Type minimal représentant un produit tel que retourné par getProductsByCategoryHandle
type ProductCardProps = {
  handle: string;
  title: string;
  thumbnail: string | null;
  amount: number | null;
  currencyCode: string | null;
};

// Carte produit utilisée dans les grilles catalogue.
// Le prix est déjà calculé côté Medusa (calculated_price), on l'affiche formaté en QAR.
export default function ProductCard({
  handle,
  title,
  thumbnail,
  amount,
  currencyCode,
}: ProductCardProps) {
  const formattedPrice =
    amount !== null && currencyCode
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currencyCode.toUpperCase(),
          maximumFractionDigits: 0,
        }).format(amount)
      : null;

  return (
    <Link href={`/products/${handle}`} className="group block">
      <div className="aspect-square overflow-hidden rounded-lg bg-foreground/5">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-foreground/40">
            {title}
          </div>
        )}
      </div>
      <h3 className="mt-3 text-sm font-medium">{title}</h3>
      {formattedPrice && (
        <p className="mt-1 text-sm text-foreground/60">{formattedPrice}</p>
      )}
    </Link>
  );
}
