import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice.js";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
