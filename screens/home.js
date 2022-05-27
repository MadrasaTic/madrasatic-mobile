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

const likeImage = require("../assets/images/like.png");
const dislikeImage = require("../assets/images/dislike.png");
const plusImage = require("../assets/images/plus.png");

const DATA = [
  {
    id: "1",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: true,
  },
  {
    id: "2",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
  {
    id: "3",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
  {
    id: "4",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
  {
    id: "5",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
  {
    id: "6",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
  {
    id: "7",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
  {
    id: "8",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
  {
    id: "9",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
  {
    id: "10",
    title: "Test title",
    description: "Lorem ipsum blablablaolnljdqsfljkjqsolidqs",
    category: "Catégorie",
    image: require("../assets/images/holder.png"),
    verified: false,
  },
];

export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const fetchData = async () => {
  //   const token = await SecureStore.getItemAsync("token");
  //   axios({
  //     method: "get",
  //     url: "http://madrasatic.tech/api/signalement",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => {
  //       setData(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const fetchData = async () => {
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("token");


    const signalReq = await axios.get("http://madrasatic.tech/api/signalement", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const categoryReq = await axios.get("http://madrasatic.tech/api/category", {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([signalReq, categoryReq])
      .then(axios.spread((...res) => {
        const signalRes = res[0];
        const categoryRes = res[1];

        // map each signal to its category
        mapCat(signalRes.data, categoryRes.data);

        // set signals data

        setData(signalRes.data.sort((a, b) => {
          return b.updated_at.localeCompare(
            a.updated_at
          );
        }));


        // set category data
        
        setCategory(categoryRes.data);
        setIsLoading(false);
      }))
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

   // map category with signals
   const mapCat = async (signalArr, categoryArr) => {
    signalArr.forEach(e => {
      categoryArr.map((cat) => {
      if (e.last_signalement_v_c.category_id === cat.id) {
        Object.assign(e, {cat})
      }
    });
    
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  const SuccessState = () => {
    return (
      <View style={styles.stateBackground}>
        <View style={styles.stateInner}>
          <View style={styles.successCircle} />
          <Small style={styles.stateText}>Traîté</Small>
        </View>
      </View>
    );
  };

  const PendingState = () => {
    return (
      <View style={styles.stateBackground}>
        <View style={styles.stateInner}>
          <View style={styles.pendingCircle} />
          <Small style={styles.stateText}>En cours de traitement</Small>
        </View>
      </View>
    );
  };

  const Signalement = ({ item }) => {
    return (
      <Card containerStyle={styles.Card} wrapperStyle={styles.inCard}>
        <View style={styles.signalHeader}>
          <Small style={styles.Category}>Catégorie</Small>
          {item.published == 1 ? <SuccessState /> : <PendingState />}
        </View>
        <Image
          style={styles.Image}
          source={{
            uri:
              "http://madrasatic.tech/storage/" +
              item.last_signalement_v_c.attachement,
          }}
        />
        <Bold>{item.title}</Bold>
        <Body style={styles.Description}>
          {item.description.length < 100
            ? item.description
            : item.description.slice(0, 100) + "..."}
        </Body>
        <View style={styles.interactiveView}>
          <View style={styles.likeDislikeView}>
            <Pressable>
              <Image style={styles.likeDislikeImage} source={likeImage} />
            </Pressable>
            <Pressable>
              <Image style={styles.likeDislikeImage} source={dislikeImage} />
            </Pressable>
          </View>
          <Pressable
            style={styles.detailButton}
            onPress={() => {
              navigation.navigate("SearchNavigator", {
                screen: "Details",
                params: { item: item },
              });
            }}
          >
            <Bold style={styles.buttonText}>Detail</Bold>
          </Pressable>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Signalement item={item} />}
        keyExtractor={(item) => item.id}
        onRefresh={() => fetchData()}
        refreshing={isLoading}
      />
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate("Ajouter")}
      >
        <Image source={plusImage} style={styles.plusImage} />
      </Pressable>
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
  Category: {
    color: COLORS.SUBTLE,
  },
  stateBackground: {
    backgroundColor: COLORS.IRIS_10,
    borderRadius: 27,
  },
  successCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.SUCCESS,
    marginTop: 6.4,
  },
  pendingCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.ERROR,
    marginTop: 6.4,
  },
  stateText: {
    color: COLORS.SUBTLE,
    borderRadius: 10,
  },
  stateInner: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  interactiveView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeDislikeView: {
    flexDirection: "row",
  },
  likeDislikeImage: {
    height: 24,
    width: 24,
    marginHorizontal: 8,
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
  addButton: {
    position: "absolute",
    bottom: 80,
    right: 15,
    backgroundColor: COLORS.PRIMARY,
    height: 57,
    width: 57,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 57,
  },
  plusImage: {
    height: 24,
    width: 24,
  },
});
