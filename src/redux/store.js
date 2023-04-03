import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./slices/cardSlice";
import { fxCurrencyApi } from "./slices/currencyApiSlice";
import sortReducer from './slices/sortSlice';

export const store = configureStore({
  reducer: {
    cards: cardReducer,
    [fxCurrencyApi.reducerPath]: fxCurrencyApi.reducer,
    test: sortReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fxCurrencyApi.middleware),
});
