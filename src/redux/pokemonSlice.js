import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemon: [],
    filteredData: [],
    currentPokemon: [],
  },
  reducers: {
    setPokemons(state, action) {
      state.pokemon = action.payload;
    },
    setFilteredData(state, action) {
      state.filteredData = action.payload;
    },

    setCurrentPokemon(state, action) {
      state.currentPokemon = action.payload;
    },
  },
});

export const { setPokemons, setFilteredData, setCurrentPokemon } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
