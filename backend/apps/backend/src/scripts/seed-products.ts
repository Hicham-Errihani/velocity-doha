/**
 * Script de seed — Produits de démonstration Velocity Doha
 * ~32 produits répartis sur les 13 sous-catégories (vélos, pièces, accessoires)
 * Prix en QAR (devise principale configurée en 1.3a)
 *
 * Exécution : npx medusa exec ./src/scripts/seed-products.ts
 */

import { ExecArgs } from "@medusajs/framework/types";
import { Modules, ProductStatus } from "@medusajs/framework/utils";
import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import {
  BIKE_FRAME_SIZES,
  APPAREL_SIZES,
  ProductCompatibilityMetadata,
} from "../lib/product-attributes";

// --- Types internes pour définir les produits de démo ---

interface DemoBikeProduct {
  categoryName: string;
  title: string;
  description: string;
  basePriceQar: number;
}

interface DemoSimpleProduct {
  categoryName: string;
  title: string;
  description: string;
  priceQar: number;
  metadata?: ProductCompatibilityMetadata;
}

// --- Données : Vélos (avec variantes Taille x Couleur) ---

const bikeProducts: DemoBikeProduct[] = [
  { categoryName: "Route", title: "Velocity Speedster R1", description: "Vélo de route léger, cadre aluminium, idéal pour la corniche de Doha.", basePriceQar: 2800 },
  { categoryName: "Route", title: "Velocity Speedster R2", description: "Vélo de route carbone, transmission 22 vitesses.", basePriceQar: 4200 },
  { categoryName: "Route", title: "Velocity Speedster R3", description: "Vélo de route endurance, confort longue distance.", basePriceQar: 3500 },
  { categoryName: "VTT", title: "Velocity Trailblazer M1", description: "VTT tout-terrain, suspension avant, freins à disque hydrauliques.", basePriceQar: 3200 },
  { categoryName: "VTT", title: "Velocity Trailblazer M2", description: "VTT semi-rigide, idéal désert et pistes rocailleuses.", basePriceQar: 3800 },
  { categoryName: "VTT", title: "Velocity Trailblazer M3", description: "VTT tout-suspendu, pour terrain technique.", basePriceQar: 5200 },
  { categoryName: "Urbain", title: "Velocity City Cruiser U1", description: "Vélo urbain confortable, panier avant inclus.", basePriceQar: 1500 },
  { categoryName: "Urbain", title: "Velocity City Cruiser U2", description: "Vélo urbain pliable, idéal transport multimodal.", basePriceQar: 1900 },
  { categoryName: "Urbain", title: "Velocity City Cruiser U3", description: "Vélo urbain design rétro, garde-boue intégrés.", basePriceQar: 1700 },
  { categoryName: "Enfant", title: "Velocity Junior J1", description: "Vélo enfant 6-8 ans, roues stabilisatrices incluses.", basePriceQar: 650 },
  { categoryName: "Enfant", title: "Velocity Junior J2", description: "Vélo enfant 9-12 ans, cadre renforcé.", basePriceQar: 850 },
  { categoryName: "Enfant", title: "Velocity Junior J3", description: "Vélo enfant premier âge, très léger.", basePriceQar: 500 },
  { categoryName: "Électrique", title: "Velocity E-Motion X1", description: "Vélo électrique, autonomie 60km, moteur central.", basePriceQar: 5500 },
  { categoryName: "Électrique", title: "Velocity E-Motion X2", description: "VTT électrique tout-terrain, batterie longue durée.", basePriceQar: 7200 },
  { categoryName: "Électrique", title: "Velocity E-Motion X3", description: "Vélo électrique pliable, idéal ville et transport.", basePriceQar: 4800 },
];

// --- Données : Casques (avec variantes Taille x Couleur) ---

const helmetProducts: DemoBikeProduct[] = [
  { categoryName: "Casques", title: "Velocity SafeHead Pro", description: "Casque route aéré, certifié sécurité CE.", basePriceQar: 280 },
  { categoryName: "Casques", title: "Velocity SafeHead VTT", description: "Casque VTT avec visière amovible.", basePriceQar: 320 },
  { categoryName: "Casques", title: "Velocity SafeHead Urban", description: "Casque urbain compact, réglage rapide.", basePriceQar: 180 },
];

// --- Données : Pièces détachées + accessoires simples (variante unique) ---

const simpleProducts: DemoSimpleProduct[] = [
  { categoryName: "Freins", title: "Kit freins à disque hydrauliques", description: "Kit complet freins à disque, haute performance.", priceQar: 420, metadata: { part_type: "freins", compatible_bike_categories: ["vtt", "route", "electrique"] } },
  { categoryName: "Freins", title: "Plaquettes de frein renforcées", description: "Plaquettes longue durée, toutes conditions.", priceQar: 85, metadata: { part_type: "freins", compatible_bike_categories: ["vtt", "route", "urbain", "electrique"] } },
  { categoryName: "Transmission", title: "Dérailleur arrière 11 vitesses", description: "Dérailleur précis, compatible cassettes standards.", priceQar: 350, metadata: { part_type: "transmission", compatible_bike_categories: ["route", "vtt"] } },
  { categoryName: "Transmission", title: "Chaîne renforcée anti-rouille", description: "Chaîne traitée, résistante au climat du Golfe.", priceQar: 120, metadata: { part_type: "transmission", compatible_bike_categories: ["route", "vtt", "urbain", "electrique"] } },
  { categoryName: "Roues", title: "Paire de roues route carbone", description: "Roues légères haute performance.", priceQar: 1800, metadata: { part_type: "roues", compatible_bike_categories: ["route"] } },
  { categoryName: "Roues", title: "Paire de roues VTT tubeless", description: "Roues tubeless ready, jantes renforcées.", priceQar: 1400, metadata: { part_type: "roues", compatible_bike_categories: ["vtt"] } },
  { categoryName: "Selles", title: "Selle confort gel", description: "Selle ergonomique, idéale longue distance.", priceQar: 150, metadata: { part_type: "selles", compatible_bike_categories: ["route", "urbain", "vtt", "electrique"] } },
  { categoryName: "Selles", title: "Selle sport carbone", description: "Selle légère profil course.", priceQar: 280, metadata: { part_type: "selles", compatible_bike_categories: ["route"] } },
  { categoryName: "Éclairage", title: "Kit éclairage avant/arrière LED", description: "Éclairage rechargeable USB, visibilité nocturne.", priceQar: 95 },
  { categoryName: "Éclairage", title: "Feu arrière clignotant solaire", description: "Feu autonome rechargement solaire.", priceQar: 65 },
  { categoryName: "Sacoches", title: "Sacoche de cadre étanche", description: "Rangement compact, étanche, fixation rapide.", priceQar: 110 },
  { categoryName: "Sacoches", title: "Sacoche de porte-bagage 20L", description: "Grande capacité, idéale transport quotidien.", priceQar: 180 },
  { categoryName: "Entretien", title: "Kit d'entretien complet", description: "Multi-outils, huile chaîne, chiffons microfibre.", priceQar: 140 },
  { categoryName: "Entretien", title: "Pompe à pied haute pression", description: "Pompe manomètre intégré, valve universelle.", priceQar: 95 },
];

export default async function seedProducts({ container }: ExecArgs) {
  const productModuleService = container.resolve(Modules.PRODUCT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const logger = container.resolve("logger");

  // Récupération du sales channel par défaut
  const [defaultSalesChannel] = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel) {
    throw new Error("Sales channel 'Default Sales Channel' introuvable.");
  }

  // Construction d'une map nom de sous-catégorie -> id
  const allCategoryNames = [
    "Route", "VTT", "Urbain", "Enfant", "Électrique",
    "Freins", "Transmission", "Roues", "Selles",
    "Casques", "Éclairage", "Sacoches", "Entretien",
  ];

  const categories = await productModuleService.listProductCategories(
    {},
    { select: ["id", "name"], take: 100 }
  );

  const categoryIdByName = new Map(categories.map((c) => [c.name, c.id]));

  // Vérification que toutes les catégories existent (sinon on arrête avant de créer quoi que ce soit)
  for (const name of allCategoryNames) {
    if (!categoryIdByName.has(name)) {
      throw new Error(`Catégorie "${name}" introuvable — lance d'abord seed-categories.ts.`);
    }
  }

  const productsToCreate: any[] = [];

  // --- Vélos : options Taille (M/L) x Couleur (Noir/Rouge) ---
  const bikeSizes = [BIKE_FRAME_SIZES[2], BIKE_FRAME_SIZES[3]]; // M, L
  const bikeColors = ["Noir", "Rouge"];

  for (const bike of bikeProducts) {
    const variants = [];
    for (const size of bikeSizes) {
      for (const color of bikeColors) {
        variants.push({
          title: `${size} / ${color}`,
          sku: `${bike.title.replace(/\s+/g, "-").toUpperCase()}-${size}-${color.substring(0, 3).toUpperCase()}`,
          options: { Taille: size, Couleur: color },
          prices: [{ amount: bike.basePriceQar, currency_code: "qar" }],
        });
      }
    }

    productsToCreate.push({
      title: bike.title,
      description: bike.description,
      status: ProductStatus.PUBLISHED,
      category_ids: [categoryIdByName.get(bike.categoryName)],
      sales_channels: [{ id: defaultSalesChannel.id }],
      options: [
        { title: "Taille", values: bikeSizes },
        { title: "Couleur", values: bikeColors },
      ],
      variants,
    });
  }

  // --- Casques : options Taille (S/M/L) x Couleur (Noir/Blanc) ---
  const helmetSizes = [APPAREL_SIZES[0], APPAREL_SIZES[1], APPAREL_SIZES[2]]; // S, M, L
  const helmetColors = ["Noir", "Blanc"];

  for (const helmet of helmetProducts) {
    const variants = [];
    for (const size of helmetSizes) {
      for (const color of helmetColors) {
        variants.push({
          title: `${size} / ${color}`,
          sku: `${helmet.title.replace(/\s+/g, "-").toUpperCase()}-${size}-${color.substring(0, 3).toUpperCase()}`,
          options: { Taille: size, Couleur: color },
          prices: [{ amount: helmet.basePriceQar, currency_code: "qar" }],
        });
      }
    }

    productsToCreate.push({
      title: helmet.title,
      description: helmet.description,
      status: ProductStatus.PUBLISHED,
      category_ids: [categoryIdByName.get(helmet.categoryName)],
      sales_channels: [{ id: defaultSalesChannel.id }],
      options: [
        { title: "Taille", values: helmetSizes },
        { title: "Couleur", values: helmetColors },
      ],
      variants,
    });
  }

  // --- Pièces détachées + accessoires simples : variante unique ---
  for (const item of simpleProducts) {
    productsToCreate.push({
      title: item.title,
      description: item.description,
      status: ProductStatus.PUBLISHED,
      category_ids: [categoryIdByName.get(item.categoryName)],
      sales_channels: [{ id: defaultSalesChannel.id }],
      metadata: item.metadata ?? undefined,
      options: [{ title: "Format", values: ["Standard"] }],
      variants: [
        {
          title: "Standard",
          sku: `${item.title.replace(/\s+/g, "-").toUpperCase()}-STD`,
          options: { Format: "Standard" },
          prices: [{ amount: item.priceQar, currency_code: "qar" }],
        },
      ],
    });
  }

  logger.info(`Création de ${productsToCreate.length} produits en cours...`);

  await createProductsWorkflow(container).run({
    input: { products: productsToCreate },
  });

  logger.info(`Seed terminé : ${productsToCreate.length} produits créés.`);
}