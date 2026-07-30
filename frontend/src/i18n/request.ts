import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Configuration exécutée à chaque requête : charge les messages
// correspondant à la locale demandée (en ou ar)
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Sécurité : si la locale n'est pas supportée, on retombe sur la locale par défaut
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
