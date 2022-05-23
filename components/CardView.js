import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Image,
} from "react-native";
import Body from "../components/typography/body";
import Bold from "./typography/bold";
import Small from "./typography/small";
import COLORS from "../constants/colors";
import { setDetailCardInvisible, setDetailCardVisible } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-native-paper";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

const CardView = () => {
  const selector = useSelector((state) => state.detailsCardReducer);
  const dispatch = useDispatch();

  const Signalement = ({ item }) => {
    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    return (
      <Card style={styles.Card}>
        <View style={styles.signalHeader}>
          <Small style={styles.Category}>{item.cat.name}</Small>
          <View style={styles.status}>
            <View style={styles.statusIndicator}></View>
            <Small style={{ color: COLORS.SUBTLE }}>
              {item.last_signalement_v_c.state_id}
            </Small>
          </View>
        </View>
        <Image
          style={styles.Image}
          source={{
            uri:
              "http://madrasatic.tech/storage/" +
              selector.item.last_signalement_v_c.attachement,
          }}
        />
        <Bold>{capitalize(selector.item.title)}</Bold>
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
      </View>
      </Card>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={selector.visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        dispatch(setDetailCardInvisible());
      }}
    >
      <TouchableOpacity
        style={{
          width: responsiveScreenWidth(100),
          height: responsiveScreenHeight(100),
        }}
        activeOpacity={1}
        onPress={() => {
          dispatch(setDetailCardInvisible());
        }}
      >
        <TouchableWithoutFeedback>
          <Signalement item={selector.item} />
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CardView;

const styles = StyleSheet.create({
  Card: {
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: COLORS.IRIS_10,
    marginTop: responsiveScreenHeight(25),
    backgroundColor: COLORS.IRIS_10,
    shadowColor: COLORS.IRIS_10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    paddingVertical: 10,
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
    marginVertical: 10,
  },
  description: {
    color: COLORS.TEXT,
    marginVertical: 10,
    marginBottom: 20,
  },
  Category: {
    color: COLORS.SUBTLE,
  },
  stateText: {
    color: COLORS.SUBTLE,
    borderRadius: 10,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.SUCCESS,
    marginRight: 4,
  },
  status: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
