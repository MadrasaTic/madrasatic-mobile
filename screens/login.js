import { StatusBar } from 'expo-status-bar';
import H3 from '../components/typography/h3';
import Bold from '../components/typography/bold';
import { ImageBackground, StyleSheet, View,  Image } from "react-native";
import COLORS from '../constants/colors';
import Body from '../components/typography/body';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const image = "../assets/images/background.png";
const googleIcon = "../assets/images/google.png";

const Login = ({ navigation }) => {
    return (
      <ImageBackground source={require(image)} style={styles.image} resizeMode="cover">
        <View style={styles.content}>
          <H3 style={styles.title}>Bienvenue à MadrasaTic !</H3>
          <Body style={styles.description}>
            MadrasaTic est une plateforme qui permet de signaler facilement 
            un problème sans se soucier de l'autorité responsable de sa résolution.
          </Body>
          
          {/* The onPress should be change to the login manager*/}
          <Pressable style={styles.Pressable} onPress={() => {navigation.navigate("LoggedInNavigator")}}>
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