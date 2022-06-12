import  React, {useState, useEffect}  from "react";
import { StyleSheet, View, Dimensions, Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import COLORS from "../constants/colors";
import Profile from "../screens/profile";
import Announcement from "../screens/announcement";
import {
  UserIcon,
  HomeIcon,
  SearchIcon,
  SpeakerphoneIcon,
} from "react-native-heroicons/solid";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import HomePageNavigator from "./homePageNavigator";
import Search from "../screens/search";

const Tab = createBottomTabNavigator();

// This is the second navigator we will use, it will serve as the bottom Tab navigator
// This navigator won't be accessed until the user is logged in

const LoggedInNavigator = ({ navigation }) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  // Animated tab indicator dot
  const offset = useSharedValue(getPos());

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value, {
            damping: 13,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  return (
    // Hiding Labels
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: COLORS.ACCENT,
            position: "absolute",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            justifyContent: "center",
            height: 70,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        {/*Home*/}
        <Tab.Screen
          name="Home"
          component={HomePageNavigator}
          options={{
            headerShown: false,
            title: "Signalements",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <HomeIcon
                  color={focused ? COLORS.PRIMARY : COLORS.SUBTLE}
                  size={24}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // on press
            tabPress: () => (offset.value = getPos() * 1.3),
          })}
        />

        {/*Search*/}
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerStyle: {
              backgroundColor: COLORS.ACCENT,
              borderColor: "transparent",
            },
            headerTitleStyle: {
              fontFamily: "WorkSans_700Bold",
              fontSize: 24,
              letterSpacing: -1,
              alignItems: 'center'
            },
            headerTitleAlign: 'center',
            headerLeft: () => null,
            headerTintColor: COLORS.PRIMARY,
            title: "Rechercher",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <SearchIcon
                  color={focused ? COLORS.PRIMARY : COLORS.SUBTLE}
                  size={24}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // on press
            tabPress: () => (offset.value = getPos() * 4),
          })}
        />



        {/*Profile*/}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: COLORS.ACCENT,

            },
            headerTitleStyle: {
              fontFamily: "WorkSans_700Bold",
              fontSize: 24,
              letterSpacing: -1,
              alignSelf: 'center'
            },
            headerTitleAlign: 'center',
            headerTintColor: COLORS.PRIMARY,
            title: "Mon Profile",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: "absolute",
                }}
              >
                <UserIcon
                  color={focused ? COLORS.PRIMARY : COLORS.SUBTLE}
                  size={24}
                />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            // on press
            tabPress: () => (offset.value = getPos() * 6.65),
          })}
        />
      </Tab.Navigator>

      {/* tab indicator dot */}
      {!keyboardStatus ? (
        <Animated.View style={[styles.dot, customSpringStyles]} />
      ) : (
        <></>
      )}
    </>
  );
};

export default LoggedInNavigator;

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    bottom: Platform.OS === "ios" ? "3%" : "1.5%", // To avoid overlapping
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 4,
    position: "absolute",
    elevation: 9,
  },
});

const getPos = () => {
  let width = Dimensions.get("window").width;
  return width / 8;
};
