import { StyleSheet, View, Pressable, Image } from "react-native";
import React from "react";
import Body from "../components/typography/body";
import Small from "../components/typography/small";
import COLORS from "../constants/colors";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";

const SmallCardView = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.image}>
        <Image
          source={{
            uri:
              "http://madrasatic.tech/storage/" +
              item.last_signalement_v_c.attachement,
          }}
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
        />
        {
          item.cat.priority.id === 1 && <View  style={styles.priority}>
        <Small style={styles.priorityText}>{item.cat.priority.name}</Small>
        </View>
        }
        
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(14, 14, 44,0.75)", "transparent"]}
          style={styles.linearGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        >
          <Body style={styles.category}>{item.cat.name}</Body>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <Body>{item.title.split(" ")[0]}</Body>
        <View style={styles.status}>
          <View style={styles.statusIndicator}></View>
          <Small style={{ color: COLORS.SUBTLE }}>
            {item.last_signalement_v_c.state_id}
          </Small>
        </View>
      </View>
    </View>
  );
};

export default SmallCardView;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    margin: 5,
    backgroundColor: "transparent",
  },
  card: {
    alignContent: "center",
    margin: 5,
    width: responsiveScreenWidth(90) / 3,
    height: responsiveScreenHeight(80) / 3,
    backgroundColor: "transparent",
  },
  content: {
    flexWrap: "wrap",
    marginLeft: 10,
    overflow: "hidden",
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
  image: {
    width: "100%",
    height: "80%",
    marginBottom: 5,
  },
  linearGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  category: {
    margin: 5,
    bottom: 0,
    color: COLORS.CLOUD,
    position: 'absolute',
  },
  priority: {
    position: "absolute",
    margin: 5,
    left: 0,
    height: 20,
    width: '55%',
    backgroundColor: COLORS.ERROR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  priorityText: {
    color: COLORS.CLOUD
  }
});
