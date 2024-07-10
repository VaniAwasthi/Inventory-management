import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/reducer';
import inventoryReducer from '../reducer/inventory.reducer';
import shipmentReducer from '../reducer/shipment.reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
    shipment:shipmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
