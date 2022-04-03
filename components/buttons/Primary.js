import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import COLORS from '../../constants/colors'

export default function Primary(props) {
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
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 8,
        width: 118,
        height: 48
      },
})