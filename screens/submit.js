import Body from '../components/typography/body';
import { View, TextInput, StyleSheet, Text, Image, Pressable } from 'react-native';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import COLORS from '../constants/colors';
import Bold from '../components/typography/bold';
import Small from '../components/typography/small';
import H3 from '../components/typography/h3';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const leftArrow = require('../assets/images/arrowLeft.png');
const camera = require('../assets/images/camera.png');

const Submit = ({navigation}) => {


    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Item 1', value: '1'},
        {label: 'Item 2', value: '2'},
        {label: 'Item 3', value: '3'},
    ]);


    let formData = new FormData();

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [4, 3],
        });
        setImage(result.uri);
    }


    const submit = async () => {
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('category_id', value);
        formData.append('annexe_id', '1');
        formData.append('infrastructure_type', '1');
        formData.append('published', 1);
        formData.append('attachement', {
            name:'image',
            uri: image,
            type: 'image/jpeg'
        });

        const token = await SecureStore.getItemAsync('token');
        axios({
            url: 'http://madrasatic.tech/api/signalement',
            method: 'POST',
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            console.log(res);
            setImage(null);
            setTitle('');
            setDesc('');
            setValue(null);
            navigation.navigate('Signalements');
        })
        .catch((err) => {
            console.log(err);
        })
    };



    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Pressable style={styles.headerPressable} onPress={() => navigation.navigate("Signalements")}>
                        <Image source={leftArrow} style={styles.headerImg} />
                    </Pressable>
                    <H3 style={styles.headerText}>Ajouter un signalement</H3>
                </View>
            </View>



            <View style={styles.container}>
                <View style={styles.titleSection}>
                    <Body style={styles.titleText}>Titre du signalement</Body>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            value={title} 
                            onChangeText={text => setTitle(text)}
                            style={styles.titleInput}
                        />
                    </View>
                </View>

                <View style={styles.categorySection}>
                    <Body style={styles.titleText}>Catégorie</Body>
                    <DropDownPicker 
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={styles.inputContainer}
                        placeholder="Choisissez une catégorie"
                    />
                </View>

                <View style={styles.descSection}>
                    <Body style={styles.titleText}>Déscription</Body>
                    <TextInput
                        multiline
                        numberOfLines={6}
                        value={desc}
                        onChangeText={text => setDesc(text)}
                        style={styles.descInput}
                        placeholder="Décrivez votre signalement"
                    />
                </View>

                  {!image ? 
                    <View style={styles.imageSection}>
                        <Pressable style={styles.imgInputContainer} onPress={() => pickImage()}>
                            <Image style={styles.imgInputPng} source={camera}  />
                            <View style={styles.imgInputTextContainer}>
                                <Small>Prendre une photo ou téléverser</Small>
                            </View> 
                        </Pressable>
                    </View>
                    :
                    <View style={styles.imageSection}>
                    <Pressable style={styles.imgPreviewInputContainer} onPress={() => pickImage()}>
                        <Image style={styles.imagePreview} source={{uri: image}}  />
                    </Pressable>
                    </View>
                    }

                <View style={styles.buttons}>
                    <Pressable style={styles.validationButton} onPress={() => submit()}>
                        <Bold style={styles.validationText}>VALIDER</Bold>
                    </Pressable>
                    <Pressable style={styles.saveButton}>
                        <Bold style={styles.saveText}>ENREGISTRER</Bold>
                    </Pressable>
                </View>

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        flexDirection: 'column',
    },
    header: {
        backgroundColor: COLORS.ACCENT,
        height: 100,
    },
    titleSection: {
        marginBottom: 10
    },
    categorySection: {
        marginBottom: 10
    },
    descSection: {
        marginBottom: 10
    },
    imageSection: {
        marginBottom: 30
    },
    buttons: {
        flexDirection: 'row',
    },
    screen: {
        backgroundColor: '#FFF'
    },  
    titleInput: {
        height: 40,
    },
    headerContent: {
        paddingTop: 50,
        paddingHorizontal: 25,
        flexDirection: 'row',
    },
    headerImg: {
        width: 24,
        height: 24,
    },
    headerPressable: { 
        marginRight: 30,
        paddingTop: 5
    },
    headerText: {
        color: COLORS.PRIMARY,
    },
    titleText: {
        color: COLORS.PRIMARY
    },
    inputContainer: {
        borderColor: COLORS.SUBTLE,
        borderWidth: 1.5,
        borderRadius: 8,
    },
    descInput: {
        backgroundColor: COLORS.ACCENT,
        borderRadius: 8,
        textAlignVertical: 'top',
        padding: 10
    },
    imgInputContainer: {
        borderStyle: 'dashed',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.SUBTLE,
        backgroundColor: COLORS.LIGHT,
        alignItems: 'center',
        paddingVertical: 45,
    },
    imgInputTextContainer: {
        backgroundColor: COLORS.IRIS_10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        width: '80%',
        borderRadius: 8
    },
    imgInputPng: {
        marginBottom: 10,
        width: 45,
        height: 45
    },
    validationButton: {
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginRight: 15
    },
    saveButton: {
        backgroundColor: COLORS.IRIS_10,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginLeft: 15
    },
    validationText: {
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    saveText: {
        color: COLORS.PRIMARY,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    imagePreview: {
        width: '100%',
        height: 280
    },
    imgPreviewInputContainer: {
        borderStyle: 'dashed',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: COLORS.SUBTLE,
        backgroundColor: COLORS.LIGHT,
        alignItems: 'center',
    }
});



export default Submit;