import { View, StyleSheet, Image, SafeAreaView, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Card } from '@rneui/themed';
import Body from '../components/typography/body';
import Bold from '../components/typography/bold';
import Small from '../components/typography/small';
import COLORS from '../constants/colors';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const likeImage = require('../assets/images/like.png');
const dislikeImage = require('../assets/images/dislike.png');



export default function Valid({ navigation }) {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const token = await SecureStore.getItemAsync('token');
    axios({
      method: 'get',
      url: 'http://madrasatic.tech/api/signalement',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setData(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    fetchData();
  }, []);


  const SuccessState = () => {
    return (
      <View style={styles.stateBackground}>
        <View style={styles.stateInner}>
          <View style={styles.successCircle} />
          <Small style={styles.stateText}>Traîté</Small>
        </View>
      </View>
    );
  };

  const PendingState = () => {
    return (
      <View style={styles.stateBackground}>
        <View style={styles.stateInner}>
          <View style={styles.pendingCircle} />
          <Small style={styles.stateText}>En cours de traitement</Small>
        </View>
      </View>
    );
  };

  const Signalement = ({id, title, description, category, last_signalement_v_c, published}) => {
    return (
      <Card containerStyle={styles.Card} wrapperStyle={styles.inCard}>
          <View style={styles.signalHeader}>
              <Small style={styles.Category}>Catégorie</Small>
              {published == 1 ? <SuccessState /> : <PendingState />}
          </View>
          <Image style={styles.Image} source={{uri: "http://madrasatic.tech/storage/" + last_signalement_v_c.attachement}} />
          <Bold>{title}</Bold>
          <Body style={styles.Description}>{description.length < 100 ? description : description.slice(0, 100) + "..."}</Body>
          <View style={styles.interactiveView}>
            <View style={styles.likeDislikeView}>
              <Pressable>
                <Image style={styles.likeDislikeImage} source={likeImage}/>
              </Pressable>
              <Pressable>
                <Image style={styles.likeDislikeImage} source={dislikeImage}/>
              </Pressable>
            </View>
            <Pressable style={styles.detailButton}>
              <Bold style={styles.buttonText}>Detail</Bold>
            </Pressable>
          </View>
      </Card>
    );
  };

  return (

    <SafeAreaView style={styles.Container}>
      <FlatList 
        data={data} 
        renderItem={({item}) => {
          if (item.published == 1) return <Signalement {...item} />
        }} 
        keyExtractor={item => item.id} 
        onRefresh={() => fetchData()}
        refreshing={isLoading}
        />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 70
  },
  Card: {
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: COLORS.IRIS_10,
  },
  inCard: {
    width: '100%',
    flex: 2,
    height: 370,
    justifyContent: 'space-between',
  },
  signalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Image: {
    width: '100%',
    height: '55%',
    borderRadius: 8
  },
  Description: {
    color: COLORS.TEXT
  },
  Category: {
    color: COLORS.SUBTLE
  },
  stateBackground: {
    backgroundColor: COLORS.IRIS_10,
    borderRadius: 27,
  },
  successCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.SUCCESS,
    marginTop: 6.4
  },
  pendingCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.ERROR,
    marginTop: 6.4
  },
  stateText: {
    color: COLORS.SUBTLE,
    borderRadius: 10
  },
  stateInner: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  interactiveView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeDislikeView: {
    flexDirection: 'row',
  },
  likeDislikeImage: {
    height: 24,
    width: 24,
    marginHorizontal: 8
  },
  buttonText: {
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  detailButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8
  }
});