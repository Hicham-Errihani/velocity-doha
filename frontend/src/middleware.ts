import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Middleware next-intl : gère la détection de langue et le routing /en, /ar
export default createMiddleware(routing);

export const config = {
  // On applique le middleware à toutes les routes sauf les fichiers statiques et l'API
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
