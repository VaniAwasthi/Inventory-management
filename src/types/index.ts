export type ApiStatus = 'LOADING' | 'SUCCEEDED' | 'FAILED';

export type InventoryItem = {
    id: number;
    name: string;
    sku: string;
    warehouse: string;
    quantity: number;
}
export type ShipmentItem ={
    id: number;
    origin: string;
    destination: string;
    status: string;
    estimatedDelivery:string;
}