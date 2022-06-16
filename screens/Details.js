import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../constants/colors";
import Bold from "../components/typography/bold";
import Small from "../components/typography/small";
import Body from "../components/typography/body";
import H3 from "../components/typography/h3";
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
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { setItem } from "../redux/actions";

const Details = ({ route, navigation }) => {
  const selector = useSelector((state) => state.itemReducer);
  const themeSelector = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const { id, cat } = route.params;
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchItem(id);
    console.log(id);
    return () => {};
  }, []);

  //fecth signal
  const fetchItem = async (id) => {
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("token");

    const signalReq = await axios.get(
      `http://madrasatic.tech/api/signalement/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const stateReq = await axios.get("http://madrasatic.tech/api/states", {
      headers: { Authorization: `Bearer ${token}` },
    });
    axios
      .all([signalReq, stateReq])
      .then(
        axios.spread((...res) => {
          const signalRes = res[0];
          const stateRes = res[1];

          mapState(signalRes.data, stateRes.data);
          dispatch(setItem(signalRes.data));
          setUpCount(signalRes.data.up_votes);
          setDownCount(signalRes.data.down_votes);
          setUpVoted(signalRes.data.isReacted === "up" ? true : false);
          setDownVoted(signalRes.data.isReacted === "down" ? true : false);
          setSaved(signalRes.data.isSaved);
          console.log(selector.item);
          setIsLoading(false);
        })
      )
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };

  const mapState = async (e, stateArr) => {
    stateArr.map((s) => {
      if (e.last_signalement_v_c.state_id === s.id) {
        Object.assign(e, { s });
      }
    });
  };

  // User reaction
  const react = async (id, reaction) => {
    const token = await SecureStore.getItemAsync("token");
    axios({
      url: `http://madrasatic.tech/api/signalement/${id}/react/${reaction}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // User reaction
  const bookMark = async (id) => {
    const token = await SecureStore.getItemAsync("token");
    axios({
      url: `http://madrasatic.tech/api/signalement/${id}/save`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: themeSelector.theme.ACCENT,
          }}
        >
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : (
        selector.item && (
          <ScrollView
            scrollEnabled={true}
            style={{
              flex: 1,
              backgroundColor: themeSelector.isLight
                ? COLORS.IRIS_10
                : COLORS.PRIMARY,
              alignContent: "center",
            }}
          >
            {/* Header */}
            <View
              style={[
                styles.header,
                {
                  backgroundColor: themeSelector.isLight
                    ? COLORS.ACCENT
                    : COLORS.DARK,
                },
              ]}
            >
              <View style={styles.headerContent}>
                <TouchableOpacity
                  style={styles.headerPressable}
                  onPress={() => navigation.goBack()}
                >
                  <ArrowLeftIcon color={themeSelector.theme.PRIMARY} />
                </TouchableOpacity>
                <H3
                  style={{
                    right: responsiveScreenWidth(35),
                    color: themeSelector.theme.PRIMARY,
                  }}
                >
                  Détails
                </H3>
              </View>
            </View>

            {/* card infos */}
            <View style={styles.cardContainer}>
              <Image
                source={{
                  uri:
                    "http://madrasatic.tech/storage/" +
                    selector.item.last_signalement_v_c.attachement,
                }}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <Bold
                  style={{
                    flexWrap: "wrap",
                    width: responsiveScreenWidth(90) / 2,
                    color: themeSelector.theme.DARK,
                  }}
                >
                  {capitalize(selector.item.title)}
                </Bold>

                {/* FIXME: if Annonce ne pas afficher etat */}
                <View style={styles.status}>
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: selector.item.s.color },
                    ]}
                  ></View>
                  <Small style={{ color: themeSelector.theme.SUBTLE }}>
                    {selector.item.last_signalement_v_c.state_id}
                  </Small>
                </View>

                <Small style={{ color: themeSelector.theme.SUBTLE }}>
                  {cat.name}
                </Small>
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
                <TouchableOpacity
                  style={styles.pressable}
                  onPress={() => {
                    react(selector.item.id, "up");
                    setUpVoted(!upVoted);

                    if (!upVoted) {
                      setUpCount(upCount + 1);
                      console.log(upCount);
                      if (downCount > 0 && downVoted)
                        setDownCount(downCount - 1);
                    } else {
                      if (upCount > 0) setUpCount(upCount - 1);
                    }
                    setDownVoted(false);
                  }}
                >
                  <ThumbUpIcon
                    color={
                      upVoted
                        ? themeSelector.isLight
                          ? COLORS.PRIMARY
                          : COLORS.LIGHT
                        : themeSelector.isLight
                        ? COLORS.SUBTLE
                        : COLORS.DARK
                    }
                  />
                  <Body
                    style={{
                      color: themeSelector.isLight ? COLORS.DARK : COLORS.LIGHT,
                    }}
                  >
                    Up votes
                  </Body>
                  <Small style={{ color: themeSelector.theme.TEXT }}>
                    {upCount}
                  </Small>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.pressable}
                  onPress={() => {
                    react(selector.item.id, "down");
                    setDownVoted(!downVoted);

                    if (!downVoted) {
                      if (upCount > 0 && upVoted) setUpCount(upCount - 1);
                      setDownCount(downCount + 1);
                    } else {
                      if (downCount > 0) setDownCount(downCount - 1);
                    }
                    setUpVoted(false);
                  }}
                >
                  <ThumbDownIcon
                    color={
                      downVoted
                        ? themeSelector.isLight
                          ? COLORS.PRIMARY
                          : COLORS.LIGHT
                        : themeSelector.isLight
                        ? COLORS.SUBTLE
                        : COLORS.DARK
                    }
                  />
                  <Body
                    style={{
                      color: themeSelector.isLight ? COLORS.DARK : COLORS.LIGHT,
                    }}
                  >
                    Down votes
                  </Body>
                  <Small style={{ color: themeSelector.theme.TEXT }}>
                    {downCount}
                  </Small>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.pressable}
                onPress={() => {
                  bookMark(selector.item.id);
                  setSaved(!saved);
                }}
              >
                <BookmarkIcon
                  color={
                    saved
                      ? themeSelector.isLight
                        ? COLORS.PRIMARY
                        : COLORS.LIGHT
                      : themeSelector.isLight
                      ? COLORS.SUBTLE
                      : COLORS.DARK
                  }
                />
                <Body
                  style={{
                    color: themeSelector.isLight ? COLORS.DARK : COLORS.LIGHT,
                  }}
                >
                  Enregistrer
                </Body>
              </TouchableOpacity>
            </View>

            {/* TODO: Details */}
            <View
              style={[
                styles.details,
                { backgroundColor: themeSelector.theme.LIGHT },
              ]}
            >
              <Body
                style={{ color: themeSelector.theme.TEXT, marginBottom: 20 }}
              >
                {capitalize(selector.item.description)}
              </Body>

              <View style={styles.grid}>
                <View style={styles.column}>
                  <View style={styles.info}>
                    <Body style={{ color: themeSelector.theme.TEXT }}>
                      Ajouté le:
                    </Body>
                    <Small style={{ color: themeSelector.theme.SUBTLE }}>
                      {selector.item.updated_at.split(".")[0].split("T")[0]}
                    </Small>
                  </View>

                  <View style={styles.info}>
                    <Body style={{ color: themeSelector.theme.TEXT }}>
                      Par:{" "}
                    </Body>
                    <Small style={{ color: themeSelector.theme.SUBTLE }}>
                      {selector.item.creator.name}
                    </Small>
                  </View>
                </View>

                <View style={styles.column}>
                  <View style={styles.info}>
                    <Body style={{ color: themeSelector.theme.TEXT }}>A: </Body>
                    <Small style={{ color: themeSelector.theme.SUBTLE }}>
                      {selector.item.updated_at.split(".")[0].split("T")[1]}
                    </Small>
                  </View>
                </View>
              </View>

              {/* infrastructure */}
              <View style={styles.info}>
                <Body style={{ color: themeSelector.theme.TEXT }}>Lieu: </Body>
                <Small style={{ color: themeSelector.theme.SUBTLE }}>
                  {selector.item.annexe &&
                  selector.item.bloc &&
                  selector.item.room
                    ? selector.item.annexe.name +
                      " > " +
                      selector.item.bloc.name +
                      " > " +
                      selector.item.room.type +
                      " " +
                      selector.item.room.name
                    : selector.item.annexe &&
                      selector.item.bloc &&
                      !selector.item.room
                    ? selector.item.annexe.name +
                      " > " +
                      selector.item.bloc.name
                    : selector.item.annexe &&
                      !selector.item.bloc &&
                      !selector.item.room
                    ? selector.item.annexe.name
                    : "?"}
                </Small>
              </View>
            </View>

            {/* TODO: Signalements rattachés */}
            <View></View>
          </ScrollView>
        )
      )}
    </>
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
  cardContent: {
    justifyContent: "flex-end",
    marginBottom: 35,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  header: {
    height: 100,
    paddingBottom: 10,
  },
  headerContent: {
    paddingTop: 65,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerPressable: {
    paddingTop: 5,
  },
});
