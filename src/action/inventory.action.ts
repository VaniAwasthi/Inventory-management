import { InventoryItem } from "../types";

// Define action types
export const LOAD_INVENTORY = 'LOAD_INVENTORY';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY';

// Define action creators
export const loadInventory = (inventoryItems: InventoryItem[]) => ({
  type: LOAD_INVENTORY,
  payload: inventoryItems,
});

export const updateInventory = (inventoryItem: InventoryItem) => ({
    type: LOAD_INVENTORY,
    payload: inventoryItem,
});
