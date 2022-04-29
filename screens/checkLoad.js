import React, { Component } from "react";
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class CheckLoad extends Component {

    checkToken = async () => {
        const token = await AsyncStorage.getItem('intro');
        if (token) {
          this.props.navigation.navigate('Login');
        } else {
          this.props.navigation.navigate('IntroSlider');
        }
      };
    
      componentDidMount() {
        this.checkToken();
      }

    render(){
        return(
            <View>
            <ActivityIndicator
              style={{
                position: 'absolute',
                flexDirection: 'row',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                marginTop: 350,
              }}
              size="large"
              color="#0275d8"
            />
          </View>
        )
    }
}

export default CheckLoad;