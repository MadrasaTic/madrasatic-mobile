import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Tertiary(props) {
  return (
    <TouchableOpacity style={styles.Pressable} onPress={props.onPress}>{props.children}</TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    Pressable : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "#EFEFFD",
        borderStyle: "solid",
        borderRadius: 8,
        width: 118,
        height: 48
      },
})