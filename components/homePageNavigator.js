import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/home';
import Bookmarked from '../screens/bookmarked';
import Valid from '../screens/valid';
import Liked from '../screens/liked';
import Disliked from '../screens/disliked';
import Submit from '../screens/submit';
import Unpublished from '../screens/unpublished';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import COLORS from '../constants/colors';
import Subtitle from './typography/subtitle';
import Small from './typography/small';
import Details from '../screens/details';
import UnpublishedDetails from '../screens/unpublishedDetails';
import { Button, Image, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

const likedImage = '../assets/images/liked.png';
const dislikedImage = '../assets/images/disliked.png';
const validImage = '../assets/images/valid.png';
const bookmarkedImage = '../assets/images/bookmarked.png';


const Drawer = createDrawerNavigator();

const customDrawerContent = ({navigation, state}) => {
    const themeSelector = useSelector((state) => state.themeReducer);
    return (
        <View style={styles.container}>
            <Subtitle style={{flex: 1, color: themeSelector.theme.TEXT}}>
                Mes signalements
            </Subtitle>
            <View style={styles.content}>
                <Pressable style={styles.navigationButton} onPress={() => navigation.navigate("Signalements")}>
                    <Small style={{color: themeSelector.theme.SUBTLE}}>Tous</Small>
                </Pressable>
                <Pressable style={styles.navigationButton} onPress={() => navigation.navigate("Enregistrés")}>
                    <Small style={{color: themeSelector.theme.SUBTLE}}>Enregistrés</Small>
                    <Image style={styles.image} source={require(bookmarkedImage)} />
                </Pressable>
                <Pressable style={styles.navigationButton} onPress={() => navigation.navigate("Validés")}>
                    <Small style={{color: themeSelector.theme.SUBTLE}}>Validés</Small>
                    <Image style={styles.image} source={require(validImage)} />
                </Pressable>
                <View style={styles.horizontalRule}></View>
                <Pressable style={styles.navigationButton} onPress={() => navigation.navigate("Aimés")}>
                    <Small style={{color: themeSelector.theme.SUBTLE}}>Aimés</Small>
                    <Image style={styles.image} source={require(likedImage)} />
                </Pressable>
                <Pressable style={styles.navigationButton} onPress={() => navigation.navigate("Non aimés")}>
                    <Small style={{color: themeSelector.theme.SUBTLE}}>Non aimés</Small>
                    <Image style={styles.image} source={require(dislikedImage)} />
                </Pressable>
                <View style={styles.horizontalRule}></View>
                <Pressable style={styles.navigationButton} onPress={() => navigation.navigate("Non publiés")}>
                    <Small style={{color: themeSelector.theme.SUBTLE}}>Non publiés</Small>
                </Pressable>
                <View style={styles.padding}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 60,
        marginHorizontal: 20
    },
    horizontalRule: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.SUBTLE,
        marginBottom: 20
    },
    navigationButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    image: {
        width: 24,
        height: 24,
    },
    content: {
        flex: 10
    },
    padding: {
        flex: 7
    }
});


const HomePageNavigator = ({navigation}) => {
    const themeSelector = useSelector((state) => state.themeReducer);
    return (
        <>
            <Drawer.Navigator 
                initialRouteName="Signalements"
                screenOptions={{
                    drawerStyle:{
                        backgroundColor:  themeSelector.theme.CLOUD,
                    },
                }}
                drawerContent={customDrawerContent}
                >
                <Drawer.Screen 
                    name="Signalements" 
                    component={Home} 
                    options={{
                        headerStyle:{
                            backgroundColor: themeSelector.isLight ? COLORS.ACCENT : COLORS.DARK,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: themeSelector.isLight ? COLORS.PRIMARY : COLORS.LIGHT,
                        headerTitleStyle: {
                            fontFamily: 'WorkSans_700Bold',
                            fontSize: 24,
                            letterSpacing: -1
                        }
                    }}
                    />
                <Drawer.Screen 
                    name="Enregistrés" 
                    component={Bookmarked}
                    options={{
                        headerStyle:{
                            backgroundColor: themeSelector.isLight ? COLORS.ACCENT : COLORS.DARK,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: themeSelector.isLight ? COLORS.PRIMARY : COLORS.LIGHT,
                        headerTitleStyle: {
                            fontFamily: 'WorkSans_700Bold',
                            fontSize: 24,
                            letterSpacing: -1
                        }
                    }}/>
                <Drawer.Screen 
                    name="Validés" 
                    component={Valid} 
                    options={{
                        headerStyle:{
                            backgroundColor: themeSelector.isLight ? COLORS.ACCENT : COLORS.DARK,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: themeSelector.isLight ? COLORS.PRIMARY : COLORS.LIGHT,
                        headerTitleStyle: {
                            fontFamily: 'WorkSans_700Bold',
                            fontSize: 24,
                            letterSpacing: -1
                        }
                    }}/>
                <Drawer.Screen 
                    name="Aimés" 
                    component={Liked}
                    options={{
                        headerStyle:{
                            backgroundColor: themeSelector.isLight ? COLORS.ACCENT : COLORS.DARK,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: themeSelector.isLight ? COLORS.PRIMARY : COLORS.LIGHT,
                        headerTitleStyle: {
                            fontFamily: 'WorkSans_700Bold',
                            fontSize: 24,
                            letterSpacing: -1
                        }
                    }}/>
                <Drawer.Screen 
                    name="Non aimés" 
                    component={Disliked}
                    options={{
                        headerStyle:{
                            backgroundColor: themeSelector.isLight ? COLORS.ACCENT : COLORS.DARK,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: themeSelector.isLight ? COLORS.PRIMARY : COLORS.LIGHT,
                        headerTitleStyle: {
                            fontFamily: 'WorkSans_700Bold',
                            fontSize: 24,
                            letterSpacing: -1
                        }
                    }}/>
                <Drawer.Screen 
                    name="Non publiés" 
                    component={Unpublished}
                    options={{
                        headerStyle:{
                            backgroundColor: themeSelector.isLight ? COLORS.ACCENT : COLORS.DARK,
                        },
                        headerTitleAlign: 'center',
                        headerTintColor: themeSelector.isLight ? COLORS.PRIMARY : COLORS.LIGHT,
                        headerTitleStyle: {
                            fontFamily: 'WorkSans_700Bold',
                            fontSize: 24,
                            letterSpacing: -1
                        }
                    }}/>
                <Drawer.Screen
                    name="Ajouter"
                    component={Submit}
                    options={{
                        headerShown: false
                    }}
                    />
                <Drawer.Screen
                    name="Details"
                    component={Details}
                    options={{
                        headerShown: false
                    }}
                    />
                <Drawer.Screen
                    name="UnpublishedDetails"
                    component={UnpublishedDetails}
                    options={{
                        headerShown: false
                    }}
                    />
            </Drawer.Navigator>
        </>
    );
};



export default HomePageNavigator;