"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Home() {
  // Récupère les traductions du namespace "Home" selon la locale active
  const t = useTranslations("Home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold">{t("heroTitle")}</h1>
      <p className="text-lg text-neutral-500">{t("heroSubtitle")}</p>
      <button className="rounded-full bg-black text-white px-6 py-3 dark:bg-white dark:text-black">
        {t("shopNow")}
      </button>

      <div className="flex gap-4 mt-8 text-sm underline">
        <Link href="/" locale="en">
          English
        </Link>
        <Link href="/" locale="ar">
          العربية
        </Link>
      </div>
    </main>
  );
}
