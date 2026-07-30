import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { createRegionsWorkflow } from "@medusajs/medusa/core-flows";

// Crée la région Qatar avec la devise QAR (Riyal Qatari), indispensable
// pour que le storefront puisse calculer et afficher les prix en QAR.
export default async function createQatarRegion({ container }: ExecArgs) {
  const regionModuleService = container.resolve(Modules.REGION);

  const [existingRegions] = await regionModuleService.listAndCountRegions(
    {},
    { select: ["id", "name"] }
  );

  const alreadyExists = existingRegions.some((r) => r.name === "Qatar");
  if (alreadyExists) {
    console.log("La région Qatar existe déjà, rien à faire.");
    return;
  }

  const { result } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Qatar",
          currency_code: "qar",
          countries: ["qa"],
        },
      ],
    },
  });

  console.log("✅ Région créée :", JSON.stringify(result, null, 2));
}
