import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../screens/search";
import Details from "../screens/Details";


const Stack = createNativeStackNavigator();
const SearchNavigator = () => {
  
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
  );
};

export default SearchNavigator;

const styles = StyleSheet.create({});
