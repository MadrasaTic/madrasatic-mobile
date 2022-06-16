import { useState, React, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import {
  useFonts,
  WorkSans_700Bold,
  WorkSans_500Medium,
} from "@expo-google-fonts/work-sans";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/login";
import IntroSlider from "./screens/introSlider";
import CheckLoad from "./screens/checkLoad";
import LoggedInNavigator from "./components/loggedInNavigator";
import Details from "./screens/Details";
import { Provider } from "react-redux";
import { Store, persistor } from "./redux/store";
import * as Notifications from "expo-notifications";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    WorkSans_700Bold,
    WorkSans_500Medium,
  });

  useEffect(() => {
    registerForPushNotifications();
    Notifications.addNotificationReceivedListener(notification => console.log(notification));
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    return () => {};
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.getPermissionsAsync();
      if (!permission.granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } catch (error) {
      console.log("Error getting a token", error);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  } else {
    return (
      <>
        <NavigationContainer>
          <Provider store={Store}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="CheckLoad" component={CheckLoad} />
              <Stack.Screen name="IntroSlider" component={IntroSlider} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen
                name="LoggedInNavigator"
                component={LoggedInNavigator}
              />
              <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      </>
    );
  }
}
