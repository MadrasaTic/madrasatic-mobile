import { useRef, React } from 'react';
import {StyleSheet, View, Dimensions} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import COLORS from '../constants/colors';
import Profile from '../screens/profile';
import Home from '../screens/Home';
import Announcement from '../screens/Announcement';
import Search from '../screens/Search';
import { UserIcon, HomeIcon, SearchIcon, SpeakerphoneIcon } from "react-native-heroicons/solid";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

// This is the second navigator we will use, it will serve as the bottom Tab navigator
// This navigator won't be accessed until the user is logged in

const LoggedInNavigator = ({ navigation }) => {
    // Animated tab indicator dot
    const offset = useSharedValue(0);

    const customSpringStyles = useAnimatedStyle(() => {
        return {
          transform: [
            {
              translateX: withSpring(offset.value, {
                damping: 13,
                stiffness: 100,
              }),
            },
          ],
        };
      });

      
    return (
        // Hiding Labels
        <>
         <Tab.Navigator 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: COLORS.ACCENT,
                position: 'absolute',
                borderRadius: 30
            }
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{
                        position: 'absolute',
                    }}>
                        <HomeIcon color={focused ? COLORS.PRIMARY : COLORS.SUBTLE} size={24}/>
                    </View>            
                )
                }} listeners={({navigation, route}) => ({
                    // on press
                    tabPress:() => (offset.value = 1)
                })}/>

            <Tab.Screen name="Search" component={Search} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{
                        position: 'absolute',
                    }}>
                        <SearchIcon color={focused ? COLORS.PRIMARY : COLORS.SUBTLE} size={24}/>
                    </View>            
                )
            }} listeners={({navigation, route}) => ({
                // on press
                tabPress:() => (offset.value = getWidth() * 2)
            })}/>

            <Tab.Screen name="Announcement" component={Announcement} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{
                        position: 'absolute',
                    }}>
                        <SpeakerphoneIcon color={focused ? COLORS.PRIMARY : COLORS.SUBTLE} size={24}/>
                    </View>            
                )
            }} listeners={({navigation, route}) => ({
                // on press
                tabPress:() => (offset.value = getWidth() * 4)
            })}/>

            <Tab.Screen name="Profile" component={Profile} options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <View style={{
                        position: 'absolute',
                    }}>
                        <UserIcon color={focused ? COLORS.PRIMARY : COLORS.SUBTLE} size={24}/>
                    </View>            
                )
            }} listeners={({navigation, route}) => ({
                // on press
                tabPress:() => (offset.value = getWidth() * 6)
            })}/>   
        </Tab.Navigator>

        {/* tab indicator dot */}
        <Animated.View style={[styles.dot, customSpringStyles]}/>
        </>   
    );
};

export default LoggedInNavigator;

const styles = StyleSheet.create({
    dot: {
        position: 'absolute',
        width: 6,
        height: 6,
        backgroundColor: COLORS.PRIMARY,
        bottom: '4%',
        borderRadius: 4,
        left: 51,
    }
})

const getWidth = () => {
    let width = Dimensions.get("window").width;
    return width/8;
}

