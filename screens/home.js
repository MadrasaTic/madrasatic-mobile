import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
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
import { FAB } from "react-native-elements";
import { PlusIcon, ThumbDownIcon, ThumbUpIcon } from "react-native-heroicons/solid";


export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);
  const themeSelector = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();


  const react = async (id, reaction) => {
    const token = await SecureStore.getItemAsync("token");
    axios({
      url: `http://madrasatic.tech/api/signalement/${id}/react/${reaction}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reactToPost = async (id, reaction) => {
    const index = data.findIndex(x => x.id == id)
    if (data[index].isReacted != reaction) {
      await react(id, reaction);
      data[index].isReacted = reaction;
      setExtraData(!extraData);
    } else {
      await react(id, reaction);
      data[index].isReacted = null;
      setExtraData(!extraData);
    }
  }

  const fetchData = async () => {
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("token");

    const signalReq = await axios.get(
      "http://madrasatic.tech/api/signalement",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const categoryReq = await axios.get("http://madrasatic.tech/api/category", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const stateReq = await axios.get("http://madrasatic.tech/api/states", {
      headers: { Authorization: `Bearer ${token}` },
    });

    axios
      .all([signalReq, categoryReq, stateReq])
      .then(
        axios.spread((...res) => {
          const signalRes = res[0];
          const categoryRes = res[1];
          const stateRes = res[2];

          // map each signal to its category
          mapCat(signalRes.data, categoryRes.data, stateRes.data);

          // set signals data

          setData(signalRes.data);
          // set category data
          setCategory(categoryRes.data);
          setIsLoading(false);
        })
      )
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log("HOME SCREEN ERROR: ")
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
  const mapCat = async (signalArr, categoryArr, stateArr) => {
    signalArr.forEach((e) => {
      categoryArr.map((cat) => {
        if (e.last_signalement_v_c.category_id === cat.id) {
          Object.assign(e, { cat });
        }
      });
      stateArr.map((s) => {
        if (e.last_signalement_v_c.state_id === s.id) {
          Object.assign(e, { s });
        }
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const SuccessState = ({ state }) => {
    return (
      <View style={styles.stateBackground}>
        <View style={styles.stateInner}>
          <View
            style={[styles.successCircle]}
          />
          <Small style={styles.stateText}>Traîté</Small>
        </View>
      </View>
    );
  };

  const PendingState = ({ state }) => {
    return (
      <View style={styles.stateBackground}>
        <View style={styles.stateInner}>
          <View
            style={[styles.pendingCircle]}
          />
          <Small style={styles.stateText}>En cours de traitement</Small>
        </View>
      </View>
    );
  };

  const Signalement = ({ item }) => {
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
        <View style={styles.signalHeader}>
          <Small style={{ color: themeSelector.theme.SUBTLE }}>
            {item.cat.name}
          </Small>
          {item.published == 1 ? (
            <SuccessState state={item.s} />
          ) : (
            <PendingState state={item.s} />
          )}
        </View>
        <Image
          style={styles.Image}
          source={{
            uri:
              "http://madrasatic.tech/storage/" +
              item.last_signalement_v_c.attachement,
          }}
        />
        <Bold style={{color: themeSelector.theme.TEXT}}>{item.title}</Bold>
        <Body style={{color: themeSelector.theme.SUBTLE}}>
          {item.description.length < 100
            ? item.description
            : item.description.slice(0, 100) + "..."}
        </Body>
        <View style={styles.interactiveView}>
          <View style={styles.likeDislikeView}>
            <Pressable onPress={() => {reactToPost(item.id, "up")}}>
            <ThumbUpIcon
                    color={
                      item.isReacted == "up"
                        ? themeSelector.isLight
                          ? COLORS.PRIMARY
                          : COLORS.LIGHT
                        : COLORS.SUBTLE
                    }
                    style={{marginRight: 20}}
                  />
            </Pressable>
            <Pressable onPress={() => {reactToPost(item.id, "down")}}>
            <ThumbDownIcon
                    color={
                      item.isReacted == "down"
                        ? themeSelector.isLight
                          ? COLORS.PRIMARY
                          : COLORS.LIGHT
                        : COLORS.SUBTLE
                    }
                  />
            </Pressable>
          </View>
          <Pressable
            style={styles.detailButton}
            onPress={() => {
              navigation.getParent().navigate("Details", {
                id: item.id,
                cat: item.cat,
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
        renderItem={({ item }) => <Signalement item={item} />}
        keyExtractor={(item) => item.id}
        onRefresh={() => fetchData()}
        refreshing={isLoading}
        extraData={data}
      />
      <FAB
        style={styles.addButton}
        color={themeSelector.theme.PRIMARY}
        icon={<PlusIcon color={themeSelector.theme.ACCENT} />}
        onPress={() => {
          navigation.navigate("Ajouter");
        }}
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
  stateBackground: {
    backgroundColor: COLORS.IRIS_10,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  successCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.SUCCESS,
  },
  pendingCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFA500'
  },
  stateText: {
    color: COLORS.SUBTLE,
    borderRadius: 10,
  },
  stateInner: {
    flexDirection: "row",
    paddingHorizontal: 4,
    paddingVertical: 3,
    alignItems: "center",
  },
  interactiveView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  likeDislikeView: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
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
