import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import COLORS from "../constants/colors";
import Bold from "../components/typography/bold";
import Small from "../components/typography/small";
import Body from "../components/typography/body";
import {
  ArrowLeftIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  BookmarkIcon,
} from "react-native-heroicons/solid";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

const Details = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.getParent().setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Search");
            navigation.getParent().setOptions({
              headerLeft: () => null,
              title: "Rechercher",
            });
          }}
          style={{ marginLeft: 10 }}
        >
          <ArrowLeftIcon color={COLORS.PRIMARY} />
        </TouchableOpacity>
      ),
      title: "Detailles",
    });
  }, [navigation]);

  const { item } = route.params;

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <ScrollView
    scrollEnabled={true}
      style={{
        flex: 1,
        backgroundColor: COLORS.IRIS_10,
        alignContent: "center",
      }}
    >
      {/* card infos */}
      <View style={styles.cardContainer}>
        <Image
          source={{
            uri:
              "http://madrasatic.tech/storage/" +
              item.last_signalement_v_c.attachement,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.cardContent}>
          <Bold style={styles.title}>{capitalize(item.title)}</Bold>

          {/* FIXME: if Annonce ne pas afficher etat */}
          <View style={styles.status}>
            <View style={styles.statusIndicator}></View>
            <Small style={{ color: COLORS.SUBTLE }}>
              {item.last_signalement_v_c.state_id}
            </Small>
          </View>

          <Small style={{ color: COLORS.SUBTLE }}>{item.cat.name}</Small>
        </View>
      </View>

      {/* TODO: reactions */}
      <View
        style={[
          styles.reactions,
          { marginHorizontal: 15, justifyContent: "space-around" },
        ]}
      >
        <View
          style={[
            styles.reactions,
            { width: 200, justifyContent: "space-between" },
          ]}
        >
          <Pressable style={styles.pressable}>
            <ThumbUpIcon color={COLORS.SUBTLE} />
            <Body style={{ color: COLORS.DARK }}>Up votes</Body>
            <Small style={{ color: COLORS.SUBTLE }}>{item.up_votes}</Small>
          </Pressable>

          <Pressable style={styles.pressable}>
            <ThumbDownIcon color={COLORS.SUBTLE} />
            <Body style={{ color: COLORS.DARK }}>Down votes</Body>
            <Small style={{ color: COLORS.SUBTLE }}>{item.down_votes}</Small>
          </Pressable>
        </View>

        <Pressable style={styles.pressable}>
          <BookmarkIcon color={COLORS.SUBTLE} />
          <Body style={{ color: COLORS.DARK }}>Enregistrer</Body>
        </Pressable>
      </View>

      {/* TODO: Details */}
      <View style={styles.details}>
        <Body style={styles.description}>{capitalize(item.description)}</Body>

        <View style={styles.grid}>
          <View style={styles.column}>
            <View style={styles.info}>
              <Body style={{ color: COLORS.TEXT }}>Ajouté le:</Body>
              <Small style={{ color: COLORS.SUBTLE }}>
                {item.updated_at.split(".")[0].split("T")[0]}
              </Small>
            </View>

            <View style={styles.info}>
              <Body style={{ color: COLORS.TEXT }}>Par: </Body>
              <Small style={{ color: COLORS.SUBTLE }}>
                {item.creator.name}
              </Small>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.info}>
              <Body style={{ color: COLORS.TEXT }}>A: </Body>
              <Small style={{ color: COLORS.SUBTLE }}>
                {item.updated_at.split(".")[0].split("T")[1]}
              </Small>
            </View>
          </View>
        </View>


        {/* infrastructure */}
        <View style={styles.info}>
          <Body style={{ color: COLORS.TEXT }}>Lieu: </Body>
          <Small style={{ color: COLORS.SUBTLE }}>
            {item.annexe && item.bloc && item.room
              ? item.annexe.name +
                " > " +
                item.bloc.name +
                " > " +
                item.room.type +
                " " +
                item.room.name
              : item.annexe && item.bloc && !item.room
              ? item.annexe.name + " > " + item.bloc.name
              : item.annexe && !item.bloc && !item.room
              ? item.annexe.name
              : "?"}
          </Small>
        </View>
      </View>

      {/* TODO: Signalements rattachés */}
      <View></View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    width: responsiveScreenWidth(90) / 3,
    height: responsiveScreenHeight(60) / 3,
    borderRadius: 8,
    marginRight: 15,
  },
  cardContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 15,
    width: responsiveScreenWidth(90),
    height: responsiveScreenHeight(60) / 3,
    backgroundColor: "transparent",
  },
  title: {
    flexWrap: "wrap",
    width: responsiveScreenWidth(90) / 2,
  },
  cardContent: {
    justifyContent: "flex-end",
    marginBottom: 35,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.SUCCESS,
    marginRight: 4,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  reactions: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  pressable: {
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    width: responsiveScreenWidth(100) - 30,
    height: 400,
    margin: 15,
    backgroundColor: COLORS.CLOUD,
    borderRadius: 10,
    padding: 15,
    shadowColor: COLORS.SUBTLE,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  description: {
    color: COLORS.SUBTLE,
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "40%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  info: {
    marginBottom: 30,
  },
});
