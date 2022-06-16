import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import Body from "../components/typography/body";
import { useDispatch, useSelector } from "react-redux";
import { check } from "../redux/actions";

const Sort = () => {
  const sortSelector = useSelector((state) => state.sortReducer);
  const dispatch = useDispatch();
  const themeSelector = useSelector((state) => state.themeReducer);
  return (
    <View>
      <TouchableOpacity
        style={styles.component}
        onPress={() => dispatch(check("alphaASC"))}
      >
        <RadioButton
          color={themeSelector.theme.SUCCESS}
          value="alphaASC"
          status={sortSelector.checked === "alphaASC" ? "checked" : "unchecked"}
          style={styles.radioBtn}
          onPress={() => dispatch(check("alphaASC"))}
        />
        <Body style={{color: themeSelector.theme.TEXT}}>Ordre alphabétique ( Croissant )</Body>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.component}
        onPress={() => dispatch(check("alphaDSC"))}
      >
        <RadioButton
          color={themeSelector.theme.SUCCESS}
          value="alphaDSC"
          status={sortSelector.checked === "alphaDSC" ? "checked" : "unchecked"}
          style={styles.radioBtn}
          onPress={() => dispatch(check("alphaDSC"))}
        />
        <Body style={{color: themeSelector.theme.TEXT}}>Ordre alphabétique ( Décroissant )</Body>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.component}
        onPress={() => dispatch(check("dateASC"))}
      >
        <RadioButton
          color={themeSelector.theme.SUCCESS}
          value="dateASC"
          status={sortSelector.checked === "dateASC" ? "checked" : "unchecked"}
          style={styles.radioBtn}
          onPress={() => dispatch(check("dateASC"))}
        />
        <Body style={{color: themeSelector.theme.TEXT}}>Date ( Croissant )</Body>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.component}
        onPress={() => dispatch(check("dateDSC"))}
      >
        <RadioButton
          color={themeSelector.theme.SUCCESS}
          value="dateDSC"
          status={sortSelector.checked === "dateDSC" ? "checked" : "unchecked"}
          style={styles.radioBtn}
          onPress={() => dispatch(check("dateDSC"))}
        />
        <Body style={{color: themeSelector.theme.TEXT}}>Date ( Décroissant )</Body>
      </TouchableOpacity>
    </View>
  );
};

export default Sort;

const styles = StyleSheet.create({
  component: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioBtn: {
    marginRight: 10,
  },
});
