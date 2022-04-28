import { StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function Tertiary(props) {
  return (
    <Pressable style={styles.Pressable}>{props.children}</Pressable>
  )
}

const styles = StyleSheet.create({
    Pressable : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "white",
        borderColor: "#EFEFFD",
        borderStyle: "solid",
        borderRadius: 8,
        width: 118,
        height: 48
      },
})