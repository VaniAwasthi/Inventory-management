import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { sleep } from '../utils';
import data from '../data/inventory.json';

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ApiStatus, InventoryItem } from '../types';
import type { RootState } from '../store';

interface AuthState {
  items: InventoryItem[];
  status: ApiStatus;
}

const initialState: AuthState = {
  items: [],
  status: 'LOADING'
};

export const fetchInventoryItems = createAsyncThunk(
    'inventory/fetch-items',
    async () => {
      await sleep(3000);
      return { data: data }
    },
  )

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addInventoryItem: (state, action: PayloadAction<{item: Omit<InventoryItem, 'id'>}>) => {
            const randomId = Math.floor(Math.random() * 100) + 1;
            state.items.push({...action.payload.item, id: randomId});
        },
        updateInventoryItem: (state, action: PayloadAction<{item: InventoryItem}>) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.item.id) {
                    return action.payload.item;
                }
                return item;
            })
        },
        deleteInventoryItem: (state, action: PayloadAction<{itemId: number}>) => {
            state.items = state.items.filter(item => item.id !== action.payload.itemId);
        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchInventoryItems.fulfilled, (state, action) => {
            state.items = action.payload.data;
            state.status = 'SUCCEEDED';
        }).addCase(fetchInventoryItems.rejected, (state) => {
            state.status = 'FAILED';
        }).addCase(fetchInventoryItems.pending, (state) => {
            state.status = 'LOADING';
        })
    }});

export const { updateInventoryItem, deleteInventoryItem, addInventoryItem } = inventorySlice.actions;

export const selectInvetoryItems = (state: RootState) => state.inventory.items; 
export const selectInvetoryItem = (state: RootState, itemId: number) => state.inventory.items.find(item => item.id === itemId); 
export const selectIsFetchingInventoryItems = (state: RootState) => state.inventory.status === 'LOADING';

export default inventorySlice.reducer;
