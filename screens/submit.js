import Body from "../components/typography/body";
import { View, TextInput, StyleSheet, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import COLORS from "../constants/colors";
import Bold from "../components/typography/bold";
import Small from "../components/typography/small";
import H3 from "../components/typography/h3";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const leftArrow = require("../assets/images/arrowLeft.png");
const camera = require("../assets/images/camera.png");

const Submit = ({ navigation, route }) => {
  DropDownPicker.setListMode("MODAL");
  const themeSelector = useSelector((state) => state.themeReducer);

  var savedId,
    description,
    savedTitle = "";

  if (route.params) {
    savedId = route.params.id;
    description = route.params.description;
    savedTitle = route.params.title;
  }

  const [id, setId] = useState(savedId);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [openCat, setOpenCat] = useState(false);
  const [openSite, setOpenSite] = useState(false);
  const [catValue, setCatValue] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locs, setLocs] = useState([]);
  const [locsValue, setLocsValue] = useState({});

  var formData = new FormData();

  const [image, setImage] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const fetchCategories = async () => {
    axios
      .get("http://madrasatic.tech/api/category")
      .then((res) => {
        var cats = [];
        res.data.forEach((element) => {
          cats.push({ label: element.name, value: element.id });
        });
        setCategories(cats);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchInfra = async () => {
    axios
      .get("http://madrasatic.tech/api/infrastructure")
      .then((res) => {
        var infra = [];
        res.data.forEach((element) => {
          element.blocs.forEach((bloc) => {
            bloc.rooms.forEach((room) => {
              infra.push({
                label: element.name + ", " + bloc.name + ", " + room.name,
                value: "" + element.id + bloc.id + room.id + "",
              });
            });
          });
        });
        setLocs(infra);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickImage = async () => {
    requestPermission();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });
    setImage(result.uri);
  };

  const update = async (publish) => {
    formData.append("category_id", catValue);
    if (publish) {
      formData.append("published", 1);
    } else {
      formData.append("published", 0);
    }
    formData.append("attachement", {
      name: "image",
      uri: image,
      type: "image/jpeg",
    });

    const token = await SecureStore.getItemAsync("token");

    axios({
      url: `http://madrasatic.tech/api/signalement/${id}`,
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        setImage(null);
        setTitle("");
        setDesc("");
        setCatValue(null);
        navigation.navigate("Signalements");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const submit = async (publish = true) => {
    console.log("submitting", publish);
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("category_id", catValue);
    formData.append("annexe_id", locsValue[0]);
    formData.append("bloc_id", locsValue[1]);
    formData.append("room_id", locsValue[2]);
    formData.append("infrastructure_type", "1");
    if (publish) {
      formData.append("published", 1);
    } else {
      formData.append("published", 0);
    }
    formData.append("attachement", {
      name: "image",
      uri: image,
      type: "image/jpeg",
    });

    const token = await SecureStore.getItemAsync("token");

    axios({
      url: "http://madrasatic.tech/api/signalement",
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setImage(null);
        setTitle("");
        setDesc("");
        setCatValue(null);
        navigation.navigate("Signalements");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchInfra();
  }, []);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: themeSelector.isLight
              ? COLORS.ACCENT
              : COLORS.DARK,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <Pressable
            style={styles.headerPressable}
            onPress={() => navigation.navigate("Signalements")}
          >
            <ArrowLeftIcon color={themeSelector.theme.PRIMARY} />
          </Pressable>
          <H3
            style={{
              color: themeSelector.theme.PRIMARY,
            }}
          >
            Ajouter un signalement
          </H3>
        </View>
      </View>

      <View style={[styles.container, {
              flex: 1,
              backgroundColor: themeSelector.isLight
                ? COLORS.IRIS_10
                : COLORS.PRIMARY,
              alignContent: "center",
            }]} scrollEnabled={true}>
        <View style={styles.section}>
           <Body style={{ color: themeSelector.theme.TEXT }}>Titre du signalement</Body>
          <View style={styles.inputContainer}>
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={[styles.titleInput, {color: COLORS.LIGHT}]}
              
            />
          </View>
        </View>

        {/* TODO: Fix dropdowns not working */}
        <View style={styles.dropdownSection}>
           <Body style={{ color: themeSelector.theme.TEXT }}>Catégorie</Body>
          <DropDownPicker
            open={openCat}
            value={catValue}
            items={categories}
            setOpen={setOpenCat}
            setValue={setCatValue}
            setItems={setCategories}
            style={styles.inputContainer}
            placeholder="Choisissez une catégorie"
          />

           <Body style={{ color: themeSelector.theme.TEXT }}>Lieu</Body>
          <DropDownPicker
            open={openSite}
            value={locsValue}
            items={locs}
            setOpen={setOpenSite}
            setValue={setLocsValue}
            setItems={setLocs}
            style={styles.inputContainer}
            placeholder="Choisissez le lieu du problème"
          />
        </View>

        <View style={styles.section}>
           <Body style={{ color: themeSelector.theme.TEXT }}>Déscription</Body>
          <TextInput
            multiline
            numberOfLines={6}
            catValue={desc}
            onChangeText={(text) => setDesc(text)}
            style={styles.descInput}
            placeholder="Décrivez votre signalement"
          />
        </View>

        {!image ? (
          <View style={styles.imageSection}>
            <Pressable
              style={styles.imgInputContainer}
              onPress={() => pickImage()}
            >
              <Image style={styles.imgInputPng} source={camera} />
              <View style={styles.imgInputTextContainer}>
                <Small>Prendre une photo ou téléverser</Small>
              </View>
            </Pressable>
          </View>
        ) : (
          <View style={styles.imageSection}>
            <Pressable
              style={styles.imgPreviewInputContainer}
              onPress={() => pickImage()}
            >
              <Image style={styles.imagePreview} source={{ uri: image }} />
            </Pressable>
          </View>
        )}

        <View style={styles.buttons}>
          <Pressable
            style={[styles.validationButton, {backgroundColor: themeSelector.isLight ? COLORS.PRIMARY : COLORS.DARK}]}
            onPress={() => {
              submit();
            }}
          >
            <Bold style={styles.validationText}>VALIDER</Bold>
          </Pressable>
          <Pressable
            style={styles.saveButton}
            onPress={() => {
              submit(false);
            }}
          >
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
    flexDirection: "column",
  },
  header: {
    backgroundColor: COLORS.ACCENT,
    height: 100,
  },
  section: {
    marginBottom: 10,
  },
  dropdownSection: {
    marginBottom: 10,
    zIndex: 10,
  },
  imageSection: {
    marginBottom: 30,
  },
  buttons: {
    flexDirection: "row",
  },
  screen: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  titleInput: {
    height: 40,
  },
  headerContent: {
    paddingTop: 50,
    paddingHorizontal: 25,
    flexDirection: "row",
  },
  headerImg: {
    width: 24,
    height: 24,
  },
  headerPressable: {
    marginRight: 30,
    paddingTop: 5,
  },
  headerText: {
    color: COLORS.PRIMARY,
  },
  titleText: {
    color: COLORS.PRIMARY,
  },
  inputContainer: {
    borderColor: COLORS.SUBTLE,
    borderWidth: 1.5,
    borderRadius: 8,
    marginVertical: 4,
  },
  descInput: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 8,
    textAlignVertical: "top",
    padding: 10,
    height: 100,
  },
  imgInputContainer: {
    borderStyle: "dashed",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.SUBTLE,
    backgroundColor: COLORS.LIGHT,
    alignItems: "center",
    paddingVertical: 20,
    height: 120,
  },
  imgInputTextContainer: {
    backgroundColor: COLORS.IRIS_10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: "center",
    borderRadius: 8,
    width: "80%",
  },
  imgInputPng: {
    width: 45,
    height: 45,
  },
  validationButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    //marginRight: 15
  },
  saveButton: {
    backgroundColor: COLORS.IRIS_10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 15,
  },
  validationText: {
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  saveText: {
    color: COLORS.PRIMARY,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imagePreview: {
    width: "100%",
    height: 100,
  },
  imgPreviewInputContainer: {
    borderStyle: "dashed",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.SUBTLE,
    backgroundColor: COLORS.LIGHT,
    alignItems: "center",
  },
});

export default Submit;
