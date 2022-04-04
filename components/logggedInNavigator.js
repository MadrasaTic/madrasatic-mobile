import { useRef, React } from 'react';
import {StyleSheet, View} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import COLORS from '../constants/colors';
import Profile from '../screens/profile';
import Home from '../screens/Home';
import Announcement from '../screens/Announcement';
import Search from '../screens/Search';
import { UserIcon, HomeIcon, SearchIcon, SpeakerphoneIcon } from "react-native-heroicons/solid";
import Animated from 'react-native-reanimated';
import { Dimensions } from 'react-native-web';

const Tab = createBottomTabNavigator();

// This is the second navigator we will use, it will serve as the bottom Tab navigator
// This navigator won't be accessed until the user is logged in

const LoggedInNavigator = ({ navigation }) => {

    // Animated tab indicator dot
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    return (
        // Hiding Labels

        <>
         <Tab.Navigator 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: COLORS.ACCENT,
                position: 'absolute',
                borderRadius: 25
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
                    tabPress: e => {
                        Animated.spring(tabOffsetValue, {
                            toValue: 0,
                            useNativeDriver: true
                        }).start();
                    }
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
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 2,
                        useNativeDriver: true
                    }).start();
                }
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
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 3,
                        useNativeDriver: true
                    }).start();
                }
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
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 4,
                        useNativeDriver: true
                    }).start();
                }
            })}/>   
        </Tab.Navigator>

        {/* tab indicator dot */}
        <Animated.View style={{
        position: 'absolute',
        width: 6,
        height: 6,
        backgroundColor: COLORS.PRIMARY,
        bottom: '4%',
        borderRadius: 4,
        left: 45,
        transform: [
                {translateX: tabOffsetValue}
            ]
        }}/>
        </>   
    );
};

export default LoggedInNavigator;

const getWidth = () => {
    let width = Dimensions.get("window").width;
    return width/5;
}

