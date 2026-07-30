import Medusa from "@medusajs/js-sdk";

// Client SDK Medusa partagé pour tout le frontend (Store API uniquement).
// baseUrl et publishableKey viennent des variables d'environnement publiques.
export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  debug: process.env.NODE_ENV === "development",
});
