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
    axios
      .get(`http://madrasatic.tech/api/signalement/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setItem(res.data));
        setUpCount(res.data.up_votes);
        setDownCount(res.data.down_votes);
        setUpVoted(res.data.isReacted === "up" ? true : false);
        setDownVoted(res.data.isReacted === "down" ? true : false);
        setSaved(res.data.isSaved);
        setIsLoading(false);
      })
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
    // <View>
    //   {/* Header */}
    //   <View style={styles.header}>
    //     <View style={styles.headerContent}>
    //       <TouchableOpacity
    //         style={styles.headerPressable}
    //         onPress={() => navigation.goBack()}
    //       >
    //         <ArrowLeftIcon color={COLORS.PRIMARY} />
    //       </TouchableOpacity>
    //       <H3 style={styles.headerText}>Détails</H3>
    //     </View>
    //   </View>
    // </View>
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
        </View>
      ) : selector.item &&  <ScrollView
      scrollEnabled={true}
      style={{
        flex: 1,
        backgroundColor: COLORS.IRIS_10,
        alignContent: "center",
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.headerPressable}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon color={COLORS.PRIMARY} />
          </TouchableOpacity>
          <H3 style={styles.headerText}>Détails</H3>
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
          <Bold style={styles.title}>
            {capitalize(selector.item.title)}
          </Bold>

          {/* FIXME: if Annonce ne pas afficher etat */}
          <View style={styles.status}>
            <View style={styles.statusIndicator}></View>
            <Small style={{ color: COLORS.SUBTLE }}>
              {selector.item.last_signalement_v_c.state_id}
            </Small>
          </View>

          <Small style={{ color: COLORS.SUBTLE }}>{cat.name}</Small>
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
                if (downCount > 0) setDownCount(downCount - 1);
              } else {
                if (upCount > 0) setUpCount(upCount - 1);
              }
              setDownVoted(false);
            }}
          >
            <ThumbUpIcon color={upVoted ? COLORS.PRIMARY : COLORS.SUBTLE} />
            <Body style={{ color: COLORS.DARK }}>Up votes</Body>
            <Small style={{ color: COLORS.SUBTLE }}>{upCount}</Small>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pressable}
            onPress={() => {
              react(selector.item.id, "down");
              setDownVoted(!downVoted);

              if (!downVoted) {
                if (upCount > 0) setUpCount(upCount - 1);
                setDownCount(downCount + 1);
              } else {
                if (downCount > 0) setDownCount(downCount - 1);
              }
              setUpVoted(false);
            }}
          >
            <ThumbDownIcon
              color={downVoted ? COLORS.PRIMARY : COLORS.SUBTLE}
            />
            <Body style={{ color: COLORS.DARK }}>Down votes</Body>
            <Small style={{ color: COLORS.SUBTLE }}>{downCount}</Small>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.pressable}
          onPress={() => {
            bookMark(selector.item.id);
            setSaved(!saved);
          }}
        >
          <BookmarkIcon color={saved ? COLORS.PRIMARY : COLORS.SUBTLE} />
          <Body style={{ color: COLORS.DARK }}>Enregistrer</Body>
        </TouchableOpacity>
      </View>

      {/* TODO: Details */}
      <View style={styles.details}>
        <Body style={styles.description}>
          {capitalize(selector.item.description)}
        </Body>

        <View style={styles.grid}>
          <View style={styles.column}>
            <View style={styles.info}>
              <Body style={{ color: COLORS.TEXT }}>Ajouté le:</Body>
              <Small style={{ color: COLORS.SUBTLE }}>
                {selector.item.updated_at.split(".")[0].split("T")[0]}
              </Small>
            </View>

            <View style={styles.info}>
              <Body style={{ color: COLORS.TEXT }}>Par: </Body>
              <Small style={{ color: COLORS.SUBTLE }}>
                {selector.item.creator.name}
              </Small>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.info}>
              <Body style={{ color: COLORS.TEXT }}>A: </Body>
              <Small style={{ color: COLORS.SUBTLE }}>
                {selector.item.updated_at.split(".")[0].split("T")[1]}
              </Small>
            </View>
          </View>
        </View>

        {/* infrastructure */}
        <View style={styles.info}>
          <Body style={{ color: COLORS.TEXT }}>Lieu: </Body>
          <Small style={{ color: COLORS.SUBTLE }}>
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
              ? selector.item.annexe.name + " > " + selector.item.bloc.name
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
    </ScrollView>}
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
  header: {
    backgroundColor: COLORS.ACCENT,
    height: 100,
    paddingBottom: 10,
  },
  headerContent: {
    paddingTop: 75,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerPressable: {
    paddingTop: 5,
  },
  headerText: {
    color: COLORS.PRIMARY,
    right: responsiveScreenWidth(35),
  },
});
