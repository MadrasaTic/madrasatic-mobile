import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Pretitle from "./typography/pretitle";
import COLORS from "../constants/colors";
import {
  SearchIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "react-native-heroicons/solid";
import { Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import {
  enableAll,
  enableSignals,
  disableSignals,
  enableAnnounce,
  disableAnnounce,
  enableTraite,
  disableTraite,
  enableNonTraite,
  disableNonTraite,
  enableEnCours,
  disableEnCours,
  setSortVisible,
  setSortInvisible,
} from "../redux/actions";
import DropDownPicker from 'react-native-dropdown-picker';


const Filter = ({ setSelectedType, selectedType, setFilteredByType, data }) => {
  var [search, setSearch] = useState("");

  const selector = useSelector((state) => state.filterReducer);
  const sortSelector = useSelector((state) => state.sortReducer);
  const dispatch = useDispatch();

  //FIXME: every filter here is for testing
  useEffect(() => {
    if (selector.all) {
      setSelectedType(1);
      console.log(selectedType);
    } else if (selector.signal) {
      setSelectedType(2);
      console.log(selectedType);
    } else if (selector.announce) {
      setSelectedType(3);
      console.log(selectedType);
    }

    if (selectedType === 1 && search === "" && sortSelector.checked === "") {
      setFilteredByType(data);
      return;
    }
    const filtered = data
      .filter(
        (signal) =>
          // TODO: filter by type (signalement / annonce)
          (signal.title.toUpperCase().includes(search.toUpperCase()) ||
          signal.description.toUpperCase().includes(search.toUpperCase()) ||
          signal.cat.name.toUpperCase().includes(search.toUpperCase())||
          signal.cat.priority.name.toUpperCase() === search.toUpperCase())
        &&
        (!selector.traite
          ? (signal.last_signalement_v_c.state_id === 1)
          : (signal.last_signalement_v_c.state_id  != 1))
      )
      .sort((a, b) => {
        switch (sortSelector.checked) {
          case "alphaASC":
            return a.title.localeCompare(b.title);
          case "alphaDSC":
            return b.title.localeCompare(a.title);
          case "dateASC":
            return a.updated_at.localeCompare(
              b.updated_at
            );
          case "dateDSC":
            return b.updated_at.localeCompare(
              a.updated_at
            );
          default:
            return b.last_signalement_v_c.created_at.localeCompare(
              a.last_signalement_v_c.created_at
            );
        }
      });
    setFilteredByType(filtered);
  }, [selectedType, search, selector, sortSelector]);

  return (
    <View style={styles.filter}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          inputContainerStyle={styles.search}
          placeholder="Rechercher"
          rightIcon={<SearchIcon color={COLORS.SUBTLE} />}
          containerStyle={{
            height: 50,
            marginTop: 10,
            width: responsiveScreenWidth(90),
          }}
          onChangeText={(value) => {
            setSearch(value);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            dispatch(setSortVisible());
          }}
        >
          <SortDescendingIcon color={COLORS.PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {/* Type filters */}
        <Pressable
          style={selector.all ? styles.btnPress : styles.btnNormal}
          onPress={() => {
            dispatch(enableAll());
          }}
        >
          <Pretitle
            style={{ color: selector.all ? COLORS.CLOUD : COLORS.PRIMARY }}
          >
            Tous
          </Pretitle>
        </Pressable>

        <Pressable
          style={selector.signal ? styles.btnPress : styles.btnNormal}
          onPress={() => {
            !selector.signal
              ? dispatch(enableSignals())
              : dispatch(disableSignals());
          }}
        >
          <Pretitle
            style={{ color: selector.signal ? COLORS.CLOUD : COLORS.PRIMARY }}
          >
            Signalements
          </Pretitle>
        </Pressable>

        <Pressable
          style={selector.announce ? styles.btnPress : styles.btnNormal}
          onPress={() => {
            !selector.announce
              ? dispatch(enableAnnounce())
              : dispatch(disableAnnounce());
          }}
        >
          <Pretitle
            style={{ color: selector.announce ? COLORS.CLOUD : COLORS.PRIMARY }}
          >
            Annonces
          </Pretitle>
        </Pressable>

        {/* Separator View */}
        <View style={styles.separator} />

        {/* Status filters */}
        <Pressable
          style={selector.traite ? styles.btnPress : styles.btnNormal}
          onPress={() => {
            !selector.traite
              ? dispatch(enableTraite())
              : dispatch(disableTraite());
          }}
        >
          <Pretitle
            style={{ color: selector.traite ? COLORS.CLOUD : COLORS.PRIMARY }}
          >
            Traité
          </Pretitle>
        </Pressable>

        <Pressable
          style={
            selector.enCoursDeTraitement ? styles.btnPress : styles.btnNormal
          }
          onPress={() => {
            !selector.enCoursDeTraitement
              ? dispatch(enableEnCours())
              : dispatch(disableEnCours());
          }}
        >
          <Pretitle
            style={{
              color: selector.enCoursDeTraitement
                ? COLORS.CLOUD
                : COLORS.PRIMARY,
            }}
          >
            En cours
          </Pretitle>
        </Pressable>

        {/* Separator View */}
        <View style={styles.separator} />

        
      </ScrollView>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  btnNormal: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  btnPress: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: COLORS.PRIMARY,
  },
  filter: {
    backgroundColor: COLORS.ACCENT,
  },
  search: {
    height: 50,
    backgroundColor: COLORS.CLOUD,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "WorkSans_500Medium",
    padding: 15,
    borderBottomWidth: 0,
  },
  separator: {
    width: 2,
    height: 35,
    backgroundColor: COLORS.SUBTLE,
    marginVertical: 2,
    marginRight: 10,
    opacity: 0.3,
    borderRadius: 2,
  },
});
