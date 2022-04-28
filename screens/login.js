import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import H3 from '../components/typography/h3';
import Bold from '../components/typography/bold';
import { ImageBackground, StyleSheet, View,  Image } from "react-native";
import COLORS from '../constants/colors';
import Body from '../components/typography/body';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import * as axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setUserName, setUserEmail, setUserPicture } from '../redux/actions';

const prefix = Linking.createURL('user_token/{token}');



const image = "../assets/images/background.png";
const googleIcon = "../assets/images/google.png";

const Login = ({ navigation }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    Linking.addEventListener('url', (url) => {
      const array = url["url"].split('/');
      const uri = array[array.length - 1];
      if (uri) {
        const token = decodeURI(uri).split("|")[1];
        SecureStore.setItemAsync('token', token);
        axios.get('http://madrasatic.tech/api/user', 
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            dispatch(setLoggedIn());
            dispatch(setUserName(res.data.name));
            dispatch(setUserEmail(res.data.email));
            dispatch(setUserPicture("http://madrasatic.tech/storage/images/" + res.data.user_information.avatar_path));
        })
        .catch((err) => {
            console.log(err);
        });
        navigation.navigate('LoggedInNavigator');
      }
      return Linking.removeEventListener('url');
    });
  }, []);



    return (
      <ImageBackground source={require(image)} style={styles.image} resizeMode="cover">
        <View style={styles.content}>
          <H3 style={styles.title}>Bienvenue à MadrasaTic !</H3>
          <Body style={styles.description}>
            MadrasaTic est une plateforme qui permet de signaler facilement 
            un problème sans se soucier de l'autorité responsable de sa résolution.
          </Body>
          
          {/* The onPress should be change to the login manager*/}
          <Pressable style={styles.Pressable} onPress={() => Linking.openURL("http://madrasatic.tech/api/login/google")}>
            <Image source={require(googleIcon)} style={styles.google} />
            <Bold style={styles.googleBtn}>Continuer avec Google</Bold>
          </Pressable>

          <Body style={styles.copyright}>
            © 2022 Quality Softwares, Inc
          </Body>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 40
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    marginBottom: 25
  },
  description: {
    color: COLORS.SUBTLE,
    marginBottom: 60
  },

  Pressable : {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#DE5246",
    borderRadius: 8,
    paddingVertical: 16.5,
    paddingHorizontal: 34.5
  },

  googleBtn : {
    color: "white",
  },

  google : {
    width: 19,
    height: 19,
    marginRight: 16
  },

  copyright: {
    color: COLORS.SUBTLE,
    marginTop: 100
  }
})

export default Login;