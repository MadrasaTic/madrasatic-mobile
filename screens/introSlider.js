import {View, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import H3 from '../components/typography/h3';
import Body from '../components/typography/body';
import COLORS from '../constants/colors';

const data = [
  {
    title: 'Bienvenue à MadrasaTIC !',
    text: 'Système de signalement interne de l\'ESI',
    image: require('../assets/images/App_wireframe.png'),
    bg: '#59b2ab',
  },
  {
    title: 'Ajouter des signalements en temps réel !',
    text: 'Permet la communication instante lors d\'un incident',
    image: require('../assets/images/Dashboard.png'),
    bg: '#febe29',
  },
  {
    title: 'Consultez l\'état de votre signalement !',
    text: "Savoir si signalement est traité ou pas",
    image: require('../assets/images/Online_information.png'),
    bg: '#22bcb5',
  },
];

export default function IntroSlider({ navigation }) {
    const renderItem = ({item}) => {
        return (
            <View style={styles.slide}>
            <Image source={item.image} style={styles.image}/>
            <View>
                <H3 style={styles.title}> {item.title} </H3>
                <Body style={styles.text}> {item.text} </Body>
            </View>   
        </View>
        )
    }

    keyExtractor = (item) => item.title;

    const renderDoneButton = () => {
        return (
            <View style={styles.right}>
                <Body style={styles.rightTxt}>Login</Body>
            </View>
        )
    };
    const renderNextButton = () => {
        return (
            <View style={styles.right}>
                <Body style={styles.rightTxt}>Suivant</Body>
            </View>
        )
    };
    const renderPrevButton = () => {
        return (
            <View style={styles.left}>
                <Body style={styles.leftTxt}>Precedent</Body>
            </View>
        )
    };

    hundleDone = () => {
        const items = [['intro', 'intro']];
        AsyncStorage.multiSet(items);
        navigation.navigate('Login');
    }

    return (
        <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderDoneButton={renderDoneButton}
          renderNextButton={renderNextButton}
          renderPrevButton={renderPrevButton}
          showPrevButton
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          data={data}
          onDone={hundleDone}
        />
      </View>
    )
  }

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 320,
        height: 320,
        marginVertical: 60,
    },
    text: {
        marginTop: 20,
        color: COLORS.SUBTLE,
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        color: COLORS.DARK,
        textAlign: 'center',
    },

    right: {
        marginRight : 20,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
    },

    left: {
        marginLeft : 20,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
    },

    rightTxt: {
        color: COLORS.PRIMARY
    },

    leftTxt: {
        color: COLORS.PRIMARY
    },

    dotStyle: {
        backgroundColor: COLORS.SUBTLE
    },

    activeDotStyle: {
        backgroundColor: COLORS.PRIMARY
    }
  });