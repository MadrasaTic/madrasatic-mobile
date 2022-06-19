import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../constants/colors";
import Bold from "../components/typography/bold";
import Small from "../components/typography/small";
import Body from "../components/typography/body";
import H3 from "../components/typography/h3";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { setItem } from "../redux/actions";

const AnnouncementDetails = ({ route, navigation }) => {
  const selector = useSelector((state) => state.itemReducer);
  const themeSelector = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchItem(id);
    console.log(id);
    return () => {};
  }, []);

  const fetchItem = async (id) => {
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("token");
    axios
      .get(`http://madrasatic.tech/api/annonce/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setItem(res.data));
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
                  uri: "http://madrasatic.tech/storage/" + selector.item.image,
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
              </View>
            </View>

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
                  <Body style={{ color: themeSelector.theme.TEXT }}>Ajouté le:</Body>
                  <Small style={{ color: themeSelector.theme.SUBTLE }}>
                      {selector.item.updated_at.split(".")[0].split("T")[0]}
                    </Small>
                  </View>

                  <View style={styles.info}>
                  <Body style={{ color: themeSelector.theme.TEXT }}>Par: </Body>
                  <Small style={{ color: themeSelector.theme.SUBTLE }}>
                      {selector.item.user.name}
                    </Small>
                  </View>
                </View>

                <View style={styles.column}>
                  <View style={styles.info}>
                    <Body style={{ color: themeSelector.theme.TEXT }}>Date début: </Body>
                    <Small style={{ color: themeSelector.theme.SUBTLE }}>
                      {selector.item.beginDate.split(" ")[0]}
                    </Small>
                  </View>

                  <View style={styles.info}>
                    <Body style={{ color: themeSelector.theme.TEXT }}>Date fin: </Body>
                    <Small style={{ color: themeSelector.theme.SUBTLE }}>
                      {selector.item.endDate.split(" ")[0]}
                    </Small>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        )
      )}
    </>
  );
};

export default AnnouncementDetails;

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
    justifyContent: "center",
    marginBottom: 35,
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
    paddingTop: 65,
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
