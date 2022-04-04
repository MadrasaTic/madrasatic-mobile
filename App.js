import { useState, React } from 'react';
import { Text, View } from 'react-native';
import { useFonts, WorkSans_700Bold, WorkSans_500Medium } from '@expo-google-fonts/work-sans';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login';
import IntroSlider from './screens/IntroSlider';
import Profile from './screens/profile';
import LoggedInNavigator from './components/logggedInNavigator';


const Stack = createNativeStackNavigator();

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const hundleIntroDone = () => {
    setShowIntro(false);
  };

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
            {showIntro && <IntroSlider hundleDone={hundleIntroDone} />}
            {
            !showIntro && <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="LoggedInNavigator" component={LoggedInNavigator} />
              </Stack.Navigator>
            </NavigationContainer>}
            
        </>
      );
  }
}

