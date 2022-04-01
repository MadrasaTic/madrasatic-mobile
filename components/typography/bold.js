import { StyleSheet, Text } from 'react-native';


const Bold = (props) => {
    return (
        <Text style={{...styles.bold, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    bold: {
        fontFamily: 'WorkSans_700Bold',
        fontSize: 16,
        alignItems: "center"
    }
})


export default Bold;