import { ShipmentItem } from "../types";

// Define action types
export const LOAD_SHIPMENT = 'LOAD_SHIPMENT';
export const UPDATE_SHIPMENT = 'UPDATE_SHIPMENT';

// Define action creators
export const loadShipment = (shipmentItems: ShipmentItem[]) => ({
  type: LOAD_SHIPMENT,
  payload: shipmentItems,
});

export const updateInventory = (shipmentItem: ShipmentItem) => ({
    type: LOAD_SHIPMENT,
    payload: shipmentItem,
});
