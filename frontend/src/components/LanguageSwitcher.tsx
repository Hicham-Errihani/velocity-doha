"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

// Bouton de bascule de langue EN/AR, conserve la page actuelle (usePathname
// de next-intl retourne déjà le chemin sans préfixe de locale)
export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const otherLocale = locale === "en" ? "ar" : "en";
  const otherLabel = locale === "en" ? "العربية" : "English";

  return (
    <Link
      href={pathname}
      locale={otherLocale}
      className="text-sm font-medium hover:text-accent transition-colors"
    >
      {otherLabel}
    </Link>
  );
}
