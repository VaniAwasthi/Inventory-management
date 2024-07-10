import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { sleep } from '../utils';
import data from '../data/shipment.json';

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ApiStatus, ShipmentItem } from '../types';
import type { RootState } from '../store';

interface AuthState {
  items: ShipmentItem[];
  status: ApiStatus;
}

const initialState: AuthState = {
  items: [],
  status: 'LOADING'
};

export const fetchShipmentItems = createAsyncThunk(
    'shipment/fetch-items',
    async () => {
      await sleep(3000);
      return { data: data }
    },
  )

export const shipmentSlice = createSlice({
    name: 'shipment',
    initialState,
    reducers: {
        addShipmentItem: (state, action: PayloadAction<{item: Omit<ShipmentItem, 'id'>}>) => {
            const randomId = Math.floor(Math.random() * 100) + 1;
            state.items.push({...action.payload.item, id: randomId});
        },
        updateShipmentItem: (state, action: PayloadAction<{item: ShipmentItem}>) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.item.id) {
                    return action.payload.item;
                }
                return item;
            })
        },
    }, extraReducers: (builder) => {
        builder.addCase(fetchShipmentItems.fulfilled, (state, action) => {
            state.items = action.payload.data;
            state.status = 'SUCCEEDED';
        }).addCase(fetchShipmentItems.rejected, (state) => {
            state.status = 'FAILED';
        }).addCase(fetchShipmentItems.pending, (state) => {
            state.status = 'LOADING';
        })
    }});

export const { updateShipmentItem, addShipmentItem } = shipmentSlice.actions;

export const selectShipmentItems = (state: RootState) => state.shipment.items; 
export const selectShipmentItem = (state: RootState, itemId: number) => state.shipment.items.find(item => item.id === itemId); 
export const selectIsFetchingShipmentItems = (state: RootState) => state.shipment.status === 'LOADING';

export default shipmentSlice.reducer;
