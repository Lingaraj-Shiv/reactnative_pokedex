import React, {useState, useEffect, memo} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import {upperCase, capitalize} from 'lodash';
import getColorByPokemonType from '../utils/getColorByPokemonType';
import {getPokemonDescriptionApi} from '../api/pokemon';

import {removeEscapeCharacters} from '../utils/removeEscapeCharacters';

import {images} from '../data/images.js';
import {useSelector} from 'react-redux';

function PokemonDetailsHeader() {
  const currentPokemon = useSelector(state => state.pokemon.currentPokemon);
  const {name, order, types, id, height, weight, abilities} = currentPokemon;

  const [pokemonDesc, setPokemonDesc] = useState();

  const color = getColorByPokemonType('background');
  const imageColor = getColorByPokemonType(types[0].type.name);
  const bgStyle = [{backgroundColor: color, ...styles.content}];
  const imageContainerStyle = [
    {backgroundColor: imageColor, ...styles.imageContainer},
  ];

  const getDescriptionPokemon = () => {
    const pokemonDescArray = pokemonDesc.flavor_text_entries
      .filter(flavor_text => flavor_text.language.name === 'en')
      .map(flavor => flavor.flavor_text);
    return (
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          lineHeight: 18,
        }}
        numberOfLines={15}>
        {removeEscapeCharacters(pokemonDescArray.join(' '))}
      </Text>
    );
  };

  const loadPokemonDesc = async id => {
    const res = await getPokemonDescriptionApi(id);
    setPokemonDesc(res);
  };

  useEffect(() => {
    (async () => {
      await loadPokemonDesc(id);
    })();
  }, [id]);

  if (!pokemonDesc) return;

  let imagePokemon =
    images[id] !== undefined ? images[id].image : images[1].image;

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={color}
        barStyle="light-content"
      />

      <SafeAreaView style={bgStyle}>
        <View style={styles.header}>
          <Text style={styles.name}>{upperCase(name)}</Text>
          <Text style={styles.order}>#{`${order}`.padStart(3, 0)}</Text>
        </View>

        <View style={styles.contentImg}>
          <View style={imageContainerStyle}>
            <Image source={imagePokemon} style={styles.image} />
          </View>

          <View style={styles.text}>{getDescriptionPokemon()}</View>
        </View>

        <View style={styles.subGroupContainer}>
          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Height</Text>
            <Text>{(height * 0.3).toFixed(2)}"</Text>
          </View>

          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Weight</Text>
            <Text>{weight / 10} Kg</Text>
          </View>
        </View>

        <View style={styles.subGroupContainer}>
          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Abilities</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {abilities.map((item, index) => (
                <Text key={item.ability.name}>
                  {/* logic for not adding comma to the last element */}
                  {index !== abilities.length - 1
                    ? capitalize(item.ability.name) + ', '
                    : capitalize(item.ability.name)}
                </Text>
              ))}
            </View>
          </View>

          <View>
            <Text style={styles.headerText}>Egg Groups</Text>
            <View style={{flexDirection: 'row'}}>
              {pokemonDesc.egg_groups.map((egg, index) => (
                <Text key={egg.name}>
                  {index !== pokemonDesc.egg_groups.length - 1
                    ? capitalize(egg.name) + ', '
                    : capitalize(egg.name)}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 27,
  },
  order: {
    color: '#1E1E1E',
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentImg: {
    marginHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  imageContainer: {
    margin: 20,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },

  subGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
  },

  group: {
    width: '100%',
    justifyContent: 'center',
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 5,
  },
});

export default memo(PokemonDetailsHeader);
