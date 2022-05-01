import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

/* Les signalements aimés */

 const Liked = ({navigation}) => {
    return (
        <View style={styles.Liked}>
            <Text>Aimés</Text>
        </View>
    );
 };


 const styles = StyleSheet.create({
    Liked: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

 export default Liked;