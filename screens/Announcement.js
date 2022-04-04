import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Announcement() {
  return (
    <View style={styles.Announcement}>
      <Text>Announcement</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Announcement: {
    flex: 1,
    backgroundColor: 'white'
  }
})