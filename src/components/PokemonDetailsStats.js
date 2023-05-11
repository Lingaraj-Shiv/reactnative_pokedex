import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import getColorByPokemonType from '../utils/getColorByPokemonType';
import {capitalize} from 'lodash';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';

const PokemonDetailsStats = () => {
  const currentPokemon = useSelector(state => state.pokemon.currentPokemon);
  const {stats} = currentPokemon;

  const color = getColorByPokemonType('stat');
  const bgStyle = [{backgroundColor: color, ...styles.content}];

  return (
    <View style={bgStyle}>
      <Text style={styles.header}>Stats</Text>
      {stats.map(attribute => (
        <View key={attribute.stat.name} style={styles.statusBar}>
          <View>
            <Text style={styles.attributes}>
              {capitalize(attribute.stat.name)}
            </Text>
          </View>
          <View>
            <Text style={styles.attributeValue}>{attribute.base_stat}</Text>
            <View style={styles.contentBar}>
              <Progress.Bar
                progress={1}
                width={200}
                borderWidth={0}
                color="#CCDDDC"
                borderRadius={0}
                height={14}
              />
            </View>
            <View style={styles.contentBarTwo}>
              <Progress.Bar
                progress={1}
                width={attribute.base_stat}
                borderWidth={0}
                color="black"
                borderRadius={0}
                height={14}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: 700,
  },
  statusBar: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  attributes: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 16,
  },
  attributeValue: {
    position: 'absolute',
    top: 0,
    left: 2,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'right',
    color: '#fefefe',
    zIndex: 100,
  },
  contentBar: {
    position: 'relative',
  },

  contentBarTwo: {
    position: 'absolute',
    top: 0,
  },
});
export default PokemonDetailsStats;
