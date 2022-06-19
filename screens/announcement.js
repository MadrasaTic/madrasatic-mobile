import { View, StyleSheet, Image, SafeAreaView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Card } from "@rneui/themed";
import Body from "../components/typography/body";
import Bold from "../components/typography/bold";
import Small from "../components/typography/small";
import COLORS from "../constants/colors";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../redux/actions";

export default function Announcement({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const themeSelector = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("token");

    const annonceReq = await axios.get("http://madrasatic.tech/api/annonce", {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([annonceReq])
      .then(
        axios.spread((...res) => {
          const annonceRes = res[0];

          // set Annonce data

          setData(
            annonceRes.data.sort((a, b) => {
              return b.updated_at.localeCompare(a.updated_at);
            })
          );

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

  useEffect(() => {
    fetchData();
  }, []);

  const Annonce = ({ item }) => {
    return (
      <Card
        containerStyle={[
          styles.Card,
          {
            backgroundColor: themeSelector.isLight ? COLORS.LIGHT : COLORS.DARK,
          },
        ]}
        wrapperStyle={styles.inCard}
      >
        <Image
          style={styles.Image}
          source={{
            uri: "http://madrasatic.tech/storage/" + item.image,
          }}
        />
        <Bold style={{ color: themeSelector.theme.TEXT }}>{item.title}</Bold>
        <Body style={{ color: themeSelector.theme.SUBTLE }}>
          {item.description.length < 100
            ? item.description
            : item.description.slice(0, 100) + "..."}
        </Body>
        <View style={styles.interactiveView}>
          <Pressable
            style={styles.detailButton}
            onPress={() => {
              navigation.getParent().navigate("AnnouncementDetails", {
                id: item.id,
              });
              dispatch(setItem(item));
            }}
          >
            <Bold style={styles.buttonText}>Détails</Bold>
          </Pressable>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.Container,
        {
          backgroundColor: themeSelector.isLight
            ? COLORS.LIGHT
            : COLORS.PRIMARY,
        },
      ]}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => <Annonce item={item} />}
        keyExtractor={(item) => item.id}
        onRefresh={() => fetchData()}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 70,
  },
  Card: {
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: COLORS.IRIS_10,
  },
  inCard: {
    width: "100%",
    flex: 2,
    height: 370,
    justifyContent: "space-between",
  },
  signalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Image: {
    width: "100%",
    height: "55%",
    borderRadius: 8,
  },
  Description: {
    color: COLORS.TEXT,
  },
  interactiveView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  detailButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
  },
});
