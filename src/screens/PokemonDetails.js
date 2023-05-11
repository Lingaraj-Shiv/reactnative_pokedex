import { ScrollView } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { getPokemonDetailsApi } from "../api/pokemon";
import PokemonDetailsHeader from "../components/PokemonDetailsHeader";
import PokemonDetailsStats from "../components/PokemonDetailsStats";
import { setCurrentPokemon } from "../redux/pokemonSlice.js";

const PokemonDetails = ({ route, navigation }) => {
  const { id } = route.params;

  const [pokemon, setPokemon] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(id);
        dispatch(setCurrentPokemon(response));
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [id]);

  if (!pokemon) return;

  return (
    <ScrollView>
      <PokemonDetailsHeader />
      <PokemonDetailsStats />
    </ScrollView>
  );
};

export default memo(PokemonDetails);
