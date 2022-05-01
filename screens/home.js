import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Home() {
  return (
    <View style={styles.Home}>
      <Text>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});