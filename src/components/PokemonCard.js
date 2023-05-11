import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {images} from '../data/images.js';

import React, {useState, useEffect, memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import getColorByPokemonType from './../utils/getColorByPokemonType';
import {capitalize} from 'lodash';
import {getPokemonsApi} from '../api/pokemon';

const PokemonCard = ({url}) => {
  const [pokemon, setPokemon] = useState();
  const navigation = useNavigation();

  const loadPokemons = async () => {
    const res = await getPokemonsApi(url);
    setPokemon(res);
  };

  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
  }, []);

  if (!pokemon) return;

  const pokemonColor = getColorByPokemonType(pokemon.types[0].type.name);
  const bgStyles = {backgroundColor: pokemonColor, ...styles.bgStyles};

  const goToPokemonDetailsScreen = () => {
    navigation.navigate('PokemonDetails', {
      id: pokemon.id,
      name: pokemon.name,
    });
  };

  let imagePokemon =
    images[pokemon.id] !== undefined
      ? images[pokemon.id].image
      : images[1].image;

  return (
    <TouchableWithoutFeedback onPress={goToPokemonDetailsScreen}>
      <View style={styles.spacing}>
        <View style={bgStyles}>
          <Image source={imagePokemon} style={styles.image} />
          <Text style={styles.number}>#{`${pokemon.order}`.padStart(3, 0)}</Text>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  spacing: {
    padding: 10,
    margin: 5,
    justifyContent: 'space-evenly',
  },
  bgStyles: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderColor: 'black',
  },
  image: {
    width: 120,
    height: 120,
  },
});

export default memo(PokemonCard);
