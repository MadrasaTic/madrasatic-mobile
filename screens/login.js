import { StatusBar } from 'expo-status-bar';
import H3 from '../components/typography/h3';
import { ImageBackground, StyleSheet, View, Button } from "react-native";
import COLORS from '../constants/colors';
import Body from '../components/typography/body';

const image = "../assets/images/loginsignup.png";

const Login = ({ navigation }) => {
    return (
      <ImageBackground source={require(image)} style={styles.image} resizeMode="cover">
        <View style={styles.content}>
          <H3 style={styles.title}>Bievenue à MadrasaTic !</H3>
          <Body style={styles.description}>
            MadrasaTic est une plateforme qui permet de signaler facilement 
            un problème sans se soucier de l'autorité responsable de sa résolution.
          </Body>
          <Button color="#DE5246" title="Se connecter" />
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
  copyright: {
    color: COLORS.SUBTLE,
    marginTop: 100
  }
})

export default Login;