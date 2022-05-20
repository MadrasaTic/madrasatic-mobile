import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors'



export default function Secondary(props) {
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
        backgroundColor: COLORS.IRIS_10,
        borderRadius: 8,
        width: 118,
        height: 48
      },
})