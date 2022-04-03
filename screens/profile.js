import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Switch } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import H3 from '../components/typography/h3';
import Body from '../components/typography/body';
import Bold from '../components/typography/bold';
import COLORS from '../constants/colors';
import { useState } from 'react';

const toggleToDarkImage = '../assets/images/toggleToDark.png';
const signOutImage = '../assets/images/signOut.png';


const Profile = ({ navigation }) => {

    const signOut = () => {
        navigation.getParent().navigate('Login');
    }

    const [isEnabledAnnonces, setIsEnabledAnnonces] = useState(false);
    const [isEnabledSignalements, setIsEnabledSignalements] = useState(false);
    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <H3 style={styles.headerTitle}>Mon Profile</H3>
                    <Pressable style={styles.toggleToDarkPressable}>
                        <Image source={require(toggleToDarkImage)} style={styles.toggleToDark}></Image>
                    </Pressable>
                </View>
                {/*User info*/}
                <View style={styles.profile}>
                    <Pressable style={styles.profilePressable}>
                        <Image source={require(toggleToDarkImage)} style={styles.profilePic}></Image>
                    </Pressable>
                    <View style={styles.info}>
                        <Body style={styles.name}>Nom Prenom</Body>
                        <Body style={styles.email}>pr.nom@esi-sba.dz</Body>
                    </View>
                </View>
                {/*Notifications*/}
                <View style={styles.notificationSettings}>
                    <Body style={styles.notificationTitle}>Notifications</Body>
                    <View style={styles.setting}>
                        <Body style={styles.settingTitle}>Annonces</Body>
                        <Switch 
                        trackColor={{false: "#767577", true: COLORS.SUCCESS}}
                        thumbColor={isEnabledAnnonces ? "#FFF" : "#f4f3f4"}
                        value={isEnabledAnnonces}
                        onChange={() => setIsEnabledAnnonces(previousState => !previousState)}
                        style={styles.switch}
                        />
                    </View>
                    <View style={styles.setting}>
                        <Body style={styles.settingTitle}>Signalements</Body>
                        <Switch 
                        trackColor={{false: "#767577", true: COLORS.SUCCESS}}
                        thumbColor={isEnabledSignalements ? "#FFF" : "#f4f3f4"}
                        value={isEnabledSignalements}
                        onChange={() => setIsEnabledSignalements(previousState => !previousState)}
                        style={styles.switch}
                        />
                    </View>
                </View>
                {/*Horizontal rule*/}
                <View style={styles.horizontalRule}></View>
                {/*Sign out*/}
                <View style={styles.signOut}>
                    <Pressable style={styles.signOutPressable} onPress={() => signOut()}>
                        <View style={styles.imageView}>
                            <Image source={require(signOutImage)} style={styles.signOutImage}></Image>
                        </View>
                        <Bold style={styles.signOutText}>Se déconnecter</Bold>
                    </Pressable>
                </View>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    container: {
        flex: 1,
        margin: 50,
        flexDirection: 'column',
    },
    header: {
        flex: 1,
        marginHorizontal: 90,
        flexDirection: 'row'
    },
    toggleToDarkPressable: {
        paddingVertical: 2,
        marginLeft: 50
    },
    toggleToDark: {
        width: 32,
        height: 32
    },
    name: {
        color: COLORS.TEXT
    },
    profile: {
        flexDirection: 'row',
        flex: 1,
    },
    profilePressable: {
        flex: 1
    },
    info: {
        flexDirection: 'column',
        flex: 3
    },
    email: {
        color: COLORS.SUBTLE
    },
    profilePic: {
        width: 58,
        height: 58
    },
    notificationSettings:{
        flex: 1,
        flexDirection: 'column',
    },
    notificationTitle: {
        color: COLORS.SUBTLE,
        flex: 1
    },
    setting: {
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 5
    },
    settingTitle: {
        flex: 2    
    },
    switch: {
        flex: 1
    },
    horizontalRule: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        flex: 1,
        marginBottom:80,
    },
    signOut: {
        flex: 1,
    },
    signOutPressable: {
        flexDirection: 'row',
    },
    signOutImage: {
        width: 20,
        height: 18,
    },
    imageView: {
        flex: 1
    },
    signOutText: {
        flex: 10,
        color: COLORS.PRIMARY
    }
});

export default Profile;
