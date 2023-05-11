import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { POKEMON_TYPE, POKEMON_GENDERS} from "../utils/constants.js";
import { getPokemonTypesModal } from "../api/pokemon.js";


const SearchModal = ({
  showModal,
  setShowModal,
  setFilterTypeData,
  setIsTypeFilterTrue,
}) => {
  const [checkedData, setCheckedData] = useState(POKEMON_TYPE);

  // apply function
  const getDataAccordingToType = async () => {
    setIsTypeFilterTrue(true);
    let trueCheckedData = checkedData.filter(
      (item, index) => item.isChecked === true
    );
    if (trueCheckedData.length === 0) {
      setIsTypeFilterTrue(false); // no filters applied
      setShowModal(false); // close the modal
      return;
    }
    trueCheckedData.map(async (item) => {
      const data = await getPokemonTypesModal(item.url);
      setFilterTypeData((prevData) => [...prevData, ...data.pokemon]);
    });

    setShowModal(false);
  };

  const resetTypeData = () => {
    setCheckedData(POKEMON_TYPE);
  };

  const toggleCheckbox = (name) => {
    let temp = checkedData.map((data) => {
      if (name === data.name) {
        return { ...data, isChecked: !data.isChecked };
      }
      return data;
    });
    setCheckedData(temp);
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Filters By Type</Text>
          {/* Modal content */}
          <FlatList
            data={checkedData}
            numColumns={2}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Checkbox item={item} toggleCheckbox={toggleCheckbox} />
            )}
            contentContainerStyle={styles.flatList}
          />

          {/* Modal Footer */}
          <View style={styles.footer}>
            <View style={styles.close}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.close}>
              <TouchableOpacity onPress={() => resetTypeData()}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.apply}>
              <TouchableOpacity onPress={() => getDataAccordingToType()}>
                <Text style={styles.buttonTextApply}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flatList: {
    // paddingVertical: 5,
    paddingHorizontal: 5,
    // marginTop: 5,
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8);",
    // height: "100%",
    // padding: 5,
  },

  modalView: {
    height: "80%",
    width: "90%",
    backgroundColor: "white",
    // borderRadius: 20,
    shadowColor: "black",
    elevation: 5,
    padding: 15,
  },
  modalText: {
    // fontSize: 30,
    marginBottom: 20,
  },

  modalHeader: {
    // fontSize: 30,
    // fontWeight: 400,
    marginVertical: 20,
  },

  footer: {
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  close: {
    // width: "45%",
    flex: 1,
    paddingVertical: 10,
    marginRight: 5,
    // backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  },
  apply: {
    // width: "45%",
    flex: 1,
    backgroundColor: "#09143C",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    marginRight: 5,
  },
  buttonText: {
    // fontSize: 15,
    // fontWeight: 500,
  },

  buttonTextApply: {
    // fontSize: 15,
    // fontWeight: 500,
    color: "#fff",
  },
});
export default SearchModal;
