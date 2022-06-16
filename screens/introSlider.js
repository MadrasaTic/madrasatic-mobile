import { View, Image, StyleSheet, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import H3 from "../components/typography/h3";
import Body from "../components/typography/body";
import COLORS from "../constants/colors";

const data = [
  {
    title: "Oú que vous soyez",
    text: "Signalez sur place en prennant une photo,\n ou téléverser à tous moment.",
    image: require("../assets/images/Location.png"),
  },
  {
    title: "Recever",
    text: "des notifications de déclarations et annonces.",
    image: require("../assets/images/EmptyInbox.png"),
  },
  {
    title: "Accées limité",
    text: "Que les utilisateurs ayant un e-mail\n '@esi-sba.dz' peuvent y acceder.",
    image: require("../assets/images/Locked-Security.png"),
  },
];

export default function IntroSlider({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View>
          <H3 style={styles.title}> {item.title} </H3>
          <Body style={styles.text}> {item.text} </Body>
        </View>
      </View>
    );
  };

  keyExtractor = (item) => item.title;

  const renderDoneButton = () => {
    return (
      <View style={styles.done}>
        <Body style={styles.rightTxtDone}>Login</Body>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.right}>
        <Body style={styles.rightTxt}>Suivant</Body>
      </View>
    );
  };
  const renderPrevButton = () => {
    return (
      <View style={styles.left}>
        <Body style={styles.leftTxt}>Precedent</Body>
      </View>
    );
  };

  hundleDone = () => {
    const items = [["intro", "intro"]];
    AsyncStorage.multiSet(items);
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        showPrevButton
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        data={data}
        onDone={hundleDone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 60,
  },
  text: {
    marginTop: 20,
    color: COLORS.SUBTLE,
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: COLORS.DARK,
    textAlign: "center",
  },

  right: {
    marginRight: 20,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  done: {
    marginRight: 20,
    height: 45,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
  },
  left: {
    marginLeft: 20,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  rightTxt: {
    color: COLORS.PRIMARY,
  },
  rightTxtDone: {
    color: COLORS.CLOUD,
  },
  leftTxt: {
    color: COLORS.PRIMARY,
  },

  dotStyle: {
    backgroundColor: COLORS.SUBTLE,
  },

  activeDotStyle: {
    backgroundColor: COLORS.PRIMARY,
  },
});
