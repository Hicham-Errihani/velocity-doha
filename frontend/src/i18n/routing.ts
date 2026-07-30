import { defineRouting } from "next-intl/routing";

// Définition du routing i18n : langues supportées et langue par défaut
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

export type AppLocale = (typeof routing.locales)[number];
