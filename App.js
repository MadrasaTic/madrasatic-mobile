import React from 'react';
import { Text, View } from 'react-native';
import { useFonts, WorkSans_700Bold, WorkSans_500Medium } from '@expo-google-fonts/work-sans';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login'



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
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}

