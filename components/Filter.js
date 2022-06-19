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
import DropDownPicker from "react-native-dropdown-picker";

const Filter = ({ setSelectedType, selectedType, setFilteredByType, data, annonces, signalements, all, setData }) => {
  var [search, setSearch] = useState("");

  const selector = useSelector((state) => state.filterReducer);
  const sortSelector = useSelector((state) => state.sortReducer);
  const themeSelector = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  //FIXME: every filter here is for testing
  useEffect(() => {
    if (selector.all) {
      setSelectedType(1);
      setData(all);
      console.log(data)
    } else if (selector.signal) {
      setSelectedType(2);
      setData(signalements);
      console.log(data)
    } else if (selector.announce) {
      setSelectedType(3);
      setData(annonces);
      console.log(data)
    }

    if (selectedType === 1 && search === "" && sortSelector.checked === "") {
      setFilteredByType(data);
      return;
    }
    const filtered = data
      .filter(
        (signal) =>
          (signal.title.toUpperCase().includes(search.toUpperCase()) ||
            signal.description.toUpperCase().includes(search.toUpperCase()) ||
            (signal.last_signalement_v_c ? signal.last_signalement_v_c.category.name
              .toUpperCase()
              .includes(search.toUpperCase()) ||
            signal.last_signalement_v_c.category.priority.name.toUpperCase() ===
              search.toUpperCase() : false)) &&
          (signal.last_signalement_v_c ?(selector.traite
            ? signal.last_signalement_v_c.state.name.toUpperCase() === "traité".toUpperCase()
            : selector.enCoursDeTraitement
            ? signal.last_signalement_v_c.state.name.toUpperCase().includes("en cours".toUpperCase())
            : true): true)
      )
      .sort((a, b) => {
        switch (sortSelector.checked) {
          case "alphaASC":
            return a.title.localeCompare(b.title);
          case "alphaDSC":
            return b.title.localeCompare(a.title);
          case "dateASC":
            return a.created_at.localeCompare(b.created_at);
          case "dateDSC":
            return b.created_at.localeCompare(a.created_at);
          default:
            return b.created_at.localeCompare(a.created_at);
        }
      });
    setFilteredByType(filtered);
  }, [selectedType, search, selector, sortSelector]);
  

  return (
    <View
      style={{
        backgroundColor: themeSelector.isLight ? COLORS.ACCENT : COLORS.DARK,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          inputContainerStyle={[
            styles.search,
            { backgroundColor: themeSelector.theme.CLOUD },
          ]}
          placeholder="Rechercher"
          rightIcon={<SearchIcon color={themeSelector.theme.SUBTLE} />}
          containerStyle={{
            height: 50,
            marginTop: 10,
            width: responsiveScreenWidth(90),
          }}
          inputStyle={{
            color: themeSelector.theme.TEXT,
            fontFamily: "WorkSans_500Medium",
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
          <SortDescendingIcon color={themeSelector.theme.PRIMARY} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {/* Type filters */}
        <Pressable
          style={
            selector.all
              ? [
                  styles.btnPress,
                  {
                    backgroundColor: themeSelector.theme.PRIMARY,
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
              : [
                  styles.btnNormal,
                  {
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
          }
          onPress={() => {
            dispatch(enableAll());
          }}
        >
          <Pretitle
            style={{
              color: selector.all
                ? themeSelector.isLight
                  ? COLORS.ACCENT
                  : COLORS.DARK
                : themeSelector.isLight
                ? COLORS.PRIMARY
                : COLORS.LIGHT,
            }}
          >
            Tous
          </Pretitle>
        </Pressable>

        <Pressable
          style={
            selector.signal
              ? [
                  styles.btnPress,
                  {
                    backgroundColor: themeSelector.theme.PRIMARY,
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
              : [
                  styles.btnNormal,
                  {
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
          }
          onPress={() => {
            !selector.signal
              ? dispatch(enableSignals())
              : dispatch(disableSignals());
          }}
        >
          <Pretitle
            style={{
              color: selector.signal
                ? themeSelector.isLight
                  ? COLORS.ACCENT
                  : COLORS.DARK
                : themeSelector.isLight
                ? COLORS.PRIMARY
                : COLORS.LIGHT,
            }}
          >
            Signalements
          </Pretitle>
        </Pressable>

        <Pressable
          style={
            selector.announce
              ? [
                  styles.btnPress,
                  {
                    backgroundColor: themeSelector.theme.PRIMARY,
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
              : [
                  styles.btnNormal,
                  {
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
          }
          onPress={() => {
            !selector.announce
              ? dispatch(enableAnnounce())
              : dispatch(disableAnnounce());
          }}
        >
          <Pretitle
            style={{
              color: selector.announce
                ? themeSelector.isLight
                  ? COLORS.ACCENT
                  : COLORS.DARK
                : themeSelector.isLight
                ? COLORS.PRIMARY
                : COLORS.LIGHT,
            }}
          >
            Annonces
          </Pretitle>
        </Pressable>

        {/* Separator View */}
        <View
          style={[
            styles.separator,
            { backgroundColor: themeSelector.theme.SUBTLE },
          ]}
        />

        {/* Status filters */}
        <Pressable
          style={
            selector.traite
              ? [
                  styles.btnPress,
                  {
                    backgroundColor: themeSelector.theme.PRIMARY,
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
              : [
                  styles.btnNormal,
                  {
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
          }
          onPress={() => {
            !selector.traite
              ? dispatch(enableTraite())
              : dispatch(disableTraite());
          }}
        >
          <Pretitle
            style={{
              color: selector.traite
                ? themeSelector.isLight
                  ? COLORS.ACCENT
                  : COLORS.DARK
                : themeSelector.isLight
                ? COLORS.PRIMARY
                : COLORS.LIGHT,
            }}
          >
            Traité
          </Pretitle>
        </Pressable>

        <Pressable
          style={
            selector.enCoursDeTraitement
              ? [
                  styles.btnPress,
                  {
                    backgroundColor: themeSelector.theme.PRIMARY,
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
              : [
                  styles.btnNormal,
                  {
                    borderColor: themeSelector.theme.PRIMARY,
                  },
                ]
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
                ? themeSelector.isLight
                  ? COLORS.ACCENT
                  : COLORS.DARK
                : themeSelector.isLight
                ? COLORS.PRIMARY
                : COLORS.LIGHT,
            }}
          >
            En cours
          </Pretitle>
        </Pressable>

        {/* Separator View */}
        <View
          style={[
            styles.separator,
            { backgroundColor: themeSelector.theme.SUBTLE },
          ]}
        />
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
  },
  search: {
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "WorkSans_500Medium",
    padding: 15,
    borderBottomWidth: 0,
  },
  separator: {
    width: 2,
    height: 35,
    marginVertical: 2,
    marginRight: 10,
    opacity: 0.3,
    borderRadius: 2,
  },
});
