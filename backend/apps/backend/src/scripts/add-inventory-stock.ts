import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

// Ajoute un niveau de stock (100 unités) pour chaque item d'inventaire,
// sur le premier stock location existant (ou en crée un "Doha Warehouse" sinon).
export default async function addInventoryStock({ container }: ExecArgs) {
  const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);
  const inventoryModuleService = container.resolve(Modules.INVENTORY);

  const [locations] = await stockLocationModuleService.listAndCountStockLocations(
    {},
    { select: ["id", "name"] }
  );

  let location = locations[0];
  if (!location) {
    location = await stockLocationModuleService.createStockLocations({
      name: "Doha Warehouse",
    });
    console.log("✅ Stock location créé :", location.name);
  } else {
    console.log("Stock location existant utilisé :", location.name);
  }

  const [inventoryItems] = await inventoryModuleService.listAndCountInventoryItems(
    {},
    { take: 500, select: ["id", "sku"] }
  );

  console.log("Inventory items trouvés:", inventoryItems.length);

  let created = 0;
  for (const item of inventoryItems) {
    try {
      await inventoryModuleService.createInventoryLevels([
        {
          inventory_item_id: item.id,
          location_id: location.id,
          stocked_quantity: 100,
        },
      ]);
      created++;
    } catch (err: any) {
      console.log(`⚠️  Ignoré (probablement déjà existant) : ${item.sku} - ${err.message}`);
    }
  }

  console.log(`✅ ${created} niveaux de stock créés sur ${inventoryItems.length} items.`);
}
