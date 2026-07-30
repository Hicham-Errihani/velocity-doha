import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Footer global : tagline, liens boutique/support, badges paiement, copyright.
// Les logos PayTabs/Tap/Dibsy seront ajoutés en Phase 3 (module réassurance,
// section 4.4 du master prompt) une fois les assets disponibles.
export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Bloc marque */}
          <div>
            <p className="font-display text-lg font-bold tracking-tight">
              Velocity <span className="text-accent">Doha</span>
            </p>
            <p className="mt-3 text-sm text-foreground/60">{t("tagline")}</p>
          </div>

          {/* Colonne boutique */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
              {t("shopTitle")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/bikes" className="text-foreground/60 hover:text-accent transition-colors">
                  {nav("bikes")}
                </Link>
              </li>
              <li>
                <Link href="/parts" className="text-foreground/60 hover:text-accent transition-colors">
                  {nav("parts")}
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-foreground/60 hover:text-accent transition-colors">
                  {nav("accessories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
              {t("supportTitle")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-foreground/60 hover:text-accent transition-colors">
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-foreground/60 hover:text-accent transition-colors">
                  {t("shippingInfo")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-foreground/60 hover:text-accent transition-colors">
                  {t("returns")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne paiement (placeholder texte, logos en Phase 3) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/80">
              {t("paymentTitle")}
            </h3>
            <p className="mt-4 text-sm text-foreground/60">
              PayTabs · Tap Payments · Dibsy
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-foreground/10 pt-6 text-center text-xs text-foreground/50">
          © {year} Velocity Doha. {t("rightsReserved")}
        </div>
      </div>
    </footer>
  );
}
