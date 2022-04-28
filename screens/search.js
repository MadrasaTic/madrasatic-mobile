import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Search() {
  return (
    <View style={styles.Search}>
      <Text>Search</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Search: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})