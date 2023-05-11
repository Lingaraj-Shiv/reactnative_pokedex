import React from "react";
import { screen } from "@testing-library/react-native";
import PokemonHome from "../src/screens/PokemonHome";
import { renderWithProviders } from "../src/utils/utils-for-test";

test("renders the search bar and pokemon cards correctly", async () => {
  const mockPokemons = {
    results: [
      { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    ],
    next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
  };

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockPokemons),
  }));

  renderWithProviders(<PokemonHome />);

  expect(screen.getByPlaceholderText('Search pokemons by name')).toBeTruthy();
  expect(screen.getByText('Bulbasaur')).toBeTruthy();
  expect(screen.getByText('Charmander')).toBeTruthy();

  global.fetch.mockRestore();
});
