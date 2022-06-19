import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Bold from "../components/typography/bold";
import COLORS from "../constants/colors";
import { Card, FAB } from "react-native-elements";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import * as axios from "axios";
import Filter from "../components/Filter";
import { ChevronUpIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortVisible,
  setSortInvisible,
  check,
  setDetailCardVisible,
  setDetailCardInvisible,
  setItem,
} from "../redux/actions";
import Sort from "../components/Sort";
import SmallCardView from "../components/SmallCardView";
import CardView from "../components/CardView";
import * as SecureStore from "expo-secure-store";

// refresh control
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Search({ navigation }) {
  const [data, setData] = useState([]);
  const [all, setAll] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [signalements, setSignalements] = useState([]);
  const [filteredByType, setFilteredByType] = useState([]);
  const [selectedType, setSelectedType] = useState(1);

  const listRef = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  const [isLoading, setIsLoading] = useState(false);

  const sortSelector = useSelector((state) => state.sortReducer);
  const selector = useSelector((state) => state.filterReducer);
  const themeSelector = useSelector((state) => state.themeReducer);
  const dispatch = useDispatch();

  // Refresh Controll
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => {
      fetchSignals();
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    fetchSignals();
    return () => {};
  }, []);

  // fetch api
  const fetchSignals = async () => {
    setIsLoading(true);
    const token = await SecureStore.getItemAsync("token");

    const signalReq = await axios.get(
      "http://madrasatic.tech/api/signalement",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const annonceReq = await axios.get("http://madrasatic.tech/api/annonce", {
      headers: { Authorization: `Bearer ${token}` },
    });


    axios
      .all([signalReq, annonceReq])
      .then(
        axios.spread((...res) => {
          const signalRes = res[0];
          const annonceRes = res[1];


          // mapReact(signalRes.data, upVoteRes.data);
          setAll(
            annonceRes.data.concat(signalRes.data).sort((a, b) => {
              return b.created_at.localeCompare(a.created_at);
            })
          );
          setData(annonceRes.data.concat(signalRes.data).sort((a, b) => {
            return b.created_at.localeCompare(a.created_at);
          }));
          setFilteredByType(annonceRes.data.concat(signalRes.data).sort((a, b) => {
            return b.created_at.localeCompare(a.created_at);
          }));
          setAnnonces(annonceRes.data);
          setSignalements(signalRes.data);
          

          console.log(filteredByType);
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


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          item.last_signalement_v_c ? 
          navigation.getParent().navigate("Details", {
            id: item.id,
          }) : navigation.getParent().navigate("AnnouncementDetails", {
            id: item.id,
          });
          dispatch(setItem(item));
        }}
        onPressOut={() => dispatch(setDetailCardInvisible())}
        delayLongPress={250}
      >
        <SmallCardView item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.Search,
        {
          backgroundColor: themeSelector.isLight
            ? COLORS.LIGHT
            : COLORS.PRIMARY,
        },
      ]}
    >
      <Filter
        data={data}
        setFilteredByType={setFilteredByType}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        annonces={annonces}
        signalements={signalements}
        all={all}
        setData={setData}
      />

      {/* Sort modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sortSelector.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          dispatch(setSortInvisible());
        }}
      >
        <TouchableOpacity
          style={{
            width: responsiveScreenWidth(100),
            height: responsiveScreenHeight(100),
          }}
          activeOpacity={1}
          onPress={() => {
            dispatch(setSortInvisible());
            dispatch(check("datedDSC"));
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalView,
                { backgroundColor: themeSelector.theme.LIGHT },
              ]}
            >
              <Bold
                style={{
                  marginBottom: 15,
                  textAlign: "center",
                  color: themeSelector.theme.DARK,
                }}
              >
                Trier par:
              </Bold>
              <Sort />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.buttonAnnuler,
                    { backgroundColor: themeSelector.theme.ACCENT },
                  ]}
                  onPress={() => {
                    dispatch(setSortInvisible());
                    dispatch(check("datedDSC"));
                  }}
                >
                  <Bold style={{ color: themeSelector.theme.DARK }}>
                    ANNULER
                  </Bold>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.buttonConfirm,
                    { backgroundColor: themeSelector.theme.PRIMARY },
                  ]}
                  onPress={() => {
                    dispatch(setSortInvisible());
                  }}
                >
                  <Bold style={{ color: themeSelector.theme.LIGHT }}>
                    CONFIRMER
                  </Bold>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      {/* <CardView /> */}

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color={themeSelector.theme.PRIMARY} />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={filteredByType}
          initialNumToRender={9}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={styles.container}
          onScroll={(event) => {
            setContentVerticalOffset(event.nativeEvent.contentOffset.y);
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
        <FAB
          style={styles.fab}
          color={themeSelector.theme.PRIMARY}
          icon={<ChevronUpIcon color={themeSelector.theme.ACCENT} />}
          onPress={() => {
            listRef.current.scrollToOffset({ offset: 0, animated: true });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Search: {
    flex: 1,
    paddingBottom: 80,
  },
  container: {
    justifyContent: "flex-start",
    flex: 1,
    margin: 5,
    backgroundColor: "transparent",
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: "13%",
    shadowColor: COLORS.SUBTLE,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 9,
    elevation: 5,
  },

  modalView: {
    justifyContent: "space-between",
    margin: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: responsiveScreenHeight(25),
  },
  buttonConfirm: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginLeft: 15,
  },
  buttonAnnuler: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
});
