import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OpenScreen = () => {
  const navigation = useNavigation();

  const goToPokemonScreen = () => {
    navigation.navigate("PokemonHome");
  };
  return (
    <View style={styles.open}>
      <View style={styles.content}>
        <Text style={styles.header}>Pokedex</Text>
        <Text style={styles.desc}>
          Search for any pokemon that exists on the Planet
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={goToPokemonScreen}>
          <Text style={styles.buttonText}>Go To Pokemon Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  open: {
    flex: 1,
  },

  content: {
    height: "70%",
    width: "100%",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 30,
  },

  header: {
    fontSize: 30,
  },

  desc: {
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 10,
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    width: "100%",
  },
  button: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#ff0000",
  },

  buttonText: {
    fontSize: 14,
  },
});

export default OpenScreen;
