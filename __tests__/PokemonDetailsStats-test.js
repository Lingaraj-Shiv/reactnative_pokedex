import React from "react";
import { screen } from "@testing-library/react-native";
import PokemonDetailsStats from "../src/components/PokemonDetailsStats";
import { renderWithProviders } from "../src/utils/utils-for-test";

test("Check if Pokemon Details Stats rendered Correctly", () => {
  const currentPokemon = {
    stats: [
      {
        base_stat: 42,
        effort: 1,
        stat: {
          name: "hp",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
    ],
  };
  renderWithProviders(<PokemonDetailsStats />, {
    preloadedState: {
      pokemon: {
        pokemon: [],
        filteredData: [],
        currentPokemon: currentPokemon,
      },
    },
  });

  expect(screen.getByText("Stats")).toBeTruthy();
  expect(screen.getByText("Hp")).toBeTruthy();
  expect(screen.getByText("42")).toBeTruthy();
});
