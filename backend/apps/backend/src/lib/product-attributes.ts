/**
 * VELOCITY DOHA — Attributs produits réutilisables
 * Structure standard pour options (taille/couleur) et métadonnées (compatibilité)
 * Utilisé par les scripts de seed produits (Phase 1, étape 1.3)
 */

// --- Options de taille selon le type de produit ---

// Vélos : taille de cadre (standard cyclisme)
export const BIKE_FRAME_SIZES = ["XS", "S", "M", "L", "XL"];

// Vêtements/casques/gants : tailles standards
export const APPAREL_SIZES = ["S", "M", "L", "XL"];

// --- Options de couleur ---

export const STANDARD_COLORS = ["Noir", "Blanc", "Rouge", "Bleu", "Vert", "Gris"];

// --- Types de pièces détachées (pour classer les métadonnées) ---

export type PartType =
  | "transmission"
  | "freins"
  | "roues"
  | "selles"
  | "eclairage"
  | "sacoches"
  | "entretien";

// --- Catégories de vélos compatibles (doit correspondre aux sous-catégories créées) ---

export type BikeCategorySlug = "route" | "vtt" | "urbain" | "enfant" | "electrique";

/**
 * Schéma de métadonnées produit — stocké dans `product.metadata`
 * Utilisé pour la compatibilité pièce ↔ vélo (approche simple validée en Phase 1)
 */
export interface ProductCompatibilityMetadata {
  // Catégories de vélos compatibles (ex: une chaîne compatible VTT + Route)
  compatible_bike_categories?: BikeCategorySlug[];

  // Modèles précis compatibles (handles produits, ex: "trek-marlin-7")
  compatible_models?: string[];

  // Type de pièce (utile pour filtres avancés côté frontend)
  part_type?: PartType;

  // Specs techniques libres (poids, matériau, etc.)
  specs?: Record<string, string | number>;
}
