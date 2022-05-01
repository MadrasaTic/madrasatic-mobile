import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

/* Les signalements non aimés */

 const Disliked = ({navigation}) => {
    return (
        <View style={styles.Disliked}>
            <Text>Non aimés</Text>
        </View>
    );
 };


 const styles = StyleSheet.create({
    Disliked: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

 export default Disliked;