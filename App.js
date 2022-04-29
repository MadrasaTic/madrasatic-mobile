import { useState, React } from 'react';
import { Text, View } from 'react-native';
import { useFonts, WorkSans_700Bold, WorkSans_500Medium } from '@expo-google-fonts/work-sans';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login';
import IntroSlider from './screens/introSlider';
import CheckLoad from './screens/checkLoad';
import LoggedInNavigator from './components/loggedInNavigator';
import { Provider } from 'react-redux';
import Store from './redux/store';





const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    WorkSans_700Bold,
    WorkSans_500Medium
  });


  if (!fontsLoaded) {
    return (
      <View>
        <Text>Chargement en cours...</Text>
      </View>
    );
  } else {
      return (
        <>
            <NavigationContainer>
              <Provider store={Store}>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                  <Stack.Screen name="CheckLoad" component={CheckLoad} />
                  <Stack.Screen name="IntroSlider" component={IntroSlider} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="LoggedInNavigator" component={LoggedInNavigator} />
                </Stack.Navigator>
              </Provider>
            </NavigationContainer>
        </>
      );
  }
}

