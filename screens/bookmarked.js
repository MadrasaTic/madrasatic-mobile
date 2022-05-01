import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

/* Les signalements enregistrés */

 const Bookmarked = ({navigation}) => {
    return (
        <View style={styles.Bookmarked}>
            <Text>Enregistrés</Text>
        </View>
    );
 };


 const styles = StyleSheet.create({
    Bookmarked: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

 export default Bookmarked;