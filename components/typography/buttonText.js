import { StyleSheet, Text } from 'react-native';


const ButtonText = (props) => {
    return (
        <Text style={{...styles.btn, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    btn: {
        fontFamily: 'WorkSans_700Bold',
        fontSize: 16,
        alignItems: "center",
        letterSpacing: 2,
    }
})


export default ButtonText;