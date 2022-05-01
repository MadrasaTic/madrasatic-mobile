import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

/* Les signalements validés */

 const Valid = ({navigation}) => {
    return (
        <View style={styles.Valid}>
            <Text>Validés</Text>
        </View>
    );
 };


 const styles = StyleSheet.create({
    Valid: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

 export default Valid;