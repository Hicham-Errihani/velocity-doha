import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ShoppingCart, User, Search } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

// Header global : logo, navigation principale, icônes panier/compte/recherche,
// et switch de langue. Server Component (pas de "use client" nécessaire ici,
// useTranslations fonctionne côté serveur avec next-intl app router).
export default function Header() {
  const t = useTranslations("Navigation");

  const navLinks = [
    { href: "/bikes", label: t("bikes") },
    { href: "/parts", label: t("parts") },
    { href: "/accessories", label: t("accessories") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          Velocity <span className="text-accent">Doha</span>
        </Link>

        {/* Navigation principale (masquée sur mobile) */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions à droite */}
        <div className="flex items-center gap-5">
          <button aria-label={t("cart")} className="hover:text-accent transition-colors">
            <Search size={20} />
          </button>
          <Link href="/account" aria-label={t("account")} className="hover:text-accent transition-colors">
            <User size={20} />
          </Link>
          <Link href="/cart" aria-label={t("cart")} className="hover:text-accent transition-colors">
            <ShoppingCart size={20} />
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
