import {
  StyleSheet,
  View,
  Image,
  Switch,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import H3 from "../components/typography/h3";
import Body from "../components/typography/body";
import Bold from "../components/typography/bold";
import COLORS from "../constants/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkTheme, setLightTheme, setLoggedOut } from "../redux/actions";
import * as SecureStore from "expo-secure-store";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { LogoutIcon } from "react-native-heroicons/solid";

const toggleToDarkImage = "../assets/images/toggleToDark.png";
const toggleToLightImage = "../assets/images/lightToggle.png";
const signOutImage = "../assets/images/signOut.png";

// This screen is responsible for the "My Profile" page, it contains user data and allows the user
// to change notification settings

const Profile = ({ navigation }) => {
  const selector = useSelector((state) => state.userReducer);
  const themeSelector = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const signOut = () => {
    SecureStore.deleteItemAsync("token");
    dispatch(setLoggedOut());
    navigation.getParent().navigate("Login");
  };

  const [isEnabledAnnonces, setIsEnabledAnnonces] = useState(false);
  const [isEnabledSignalements, setIsEnabledSignalements] = useState(false);

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: themeSelector.isLight
            ? COLORS.LIGHT
            : COLORS.PRIMARY,
        },
      ]}
    >
      <StatusBar
        backgroundColor={themeSelector.isLight ? COLORS.IRIS_10 : COLORS.DARK}
        barStyle={themeSelector.statusbarStyle}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.toggleToDarkPressable}
            onPress={() => {
              themeSelector.isLight
                ? dispatch(setDarkTheme())
                : dispatch(setLightTheme());
            }}
          >
            <Image
              source={
                themeSelector.isLight
                  ? require(toggleToDarkImage)
                  : require(toggleToLightImage)
              }
              style={styles.toggleToDark}
            ></Image>
          </TouchableOpacity>
        </View>
        {/*User info*/}
        <View style={styles.profile}>
          <Pressable style={styles.profilePressable}>
            <Image
              source={{ uri: selector.picture }}
              style={styles.profilePic}
            ></Image>
          </Pressable>
          <View style={styles.info}>
            <Body style={{ color: themeSelector.theme.TEXT }}>
              {selector.name}
            </Body>
            <Body style={{ color: themeSelector.theme.SUBTLE }}>
              {selector.email}
            </Body>
          </View>
        </View>
        {/*Notifications*/}
        <View style={styles.notificationSettings}>
          <Bold
            style={{
              flex: 1,
              color: themeSelector.isLight ? COLORS.SUBTLE : COLORS.CLOUD,
            }}
          >
            Notifications
          </Bold>
          <View style={styles.setting}>
            <Body style={{ color: themeSelector.theme.PRIMARY }}>Annonces</Body>
            <Switch
              trackColor={{
                false: "#767577",
                true: themeSelector.theme.SUCCESS,
              }}
              thumbColor={isEnabledAnnonces ? COLORS.LIGHT : "#f4f3f4"}
              value={isEnabledAnnonces}
              onChange={() =>
                setIsEnabledAnnonces((previousState) => !previousState)
              }
              style={styles.switch}
            />
          </View>
          <View style={styles.setting}>
            <Body style={{ color: themeSelector.theme.PRIMARY }}>
              Signalements
            </Body>
            <Switch
              trackColor={{
                false: "#767577",
                true: themeSelector.theme.SUCCESS,
              }}
              thumbColor={isEnabledSignalements ? COLORS.LIGHT : "#f4f3f4"}
              value={isEnabledSignalements}
              onChange={() =>
                setIsEnabledSignalements((previousState) => !previousState)
              }
              style={styles.switch}
            />
          </View>
        </View>
        {/*Horizontal rule*/}
        <View
          style={[
            styles.horizontalRule,
            { color: themeSelector.theme.PRIMARY },
          ]}
        ></View>
        {/*Sign out*/}
        <View style={styles.signOut}>
          <TouchableOpacity
            style={[
              styles.signOutPressable,
              { color: themeSelector.theme.PRIMARY },
            ]}
            onPress={() => signOut()}
          >
            <View style={styles.imageView}>
              <LogoutIcon color={themeSelector.theme.PRIMARY} />
            </View>
            <Bold style={{ flex: 10, color: themeSelector.theme.PRIMARY }}>
              Se déconnecter
            </Bold>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 40,
    flexDirection: "column",
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 25,
  },
  toggleToDarkPressable: {
    paddingVertical: 2,
  },
  toggleToDark: {
    width: 32,
    height: 32,
  },
  profile: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  profilePressable: {
    flex: 1,
  },
  info: {
    flexDirection: "column",
    flex: 3,
  },
  profilePic: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
  },
  notificationSettings: {
    flex: 1,
    flexDirection: "column",
  },
  setting: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 5,
    justifyContent: "space-between",
  },
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    flex: 1,
    marginBottom: 80,
  },
  signOut: {
    flex: 1,
  },
  signOutPressable: {
    flexDirection: "row",
  },
  imageView: {
    flex: 1,
  },
});

export default Profile;
