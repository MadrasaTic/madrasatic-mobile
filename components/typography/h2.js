import { StyleSheet, Text } from 'react-native';


const H2 = (props) => {
    return (
        <Text style={{...styles.h2, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    h2: {
        fontFamily: 'WorkSans_700Bold',
        fontSize: 40,
        letterSpacing: -2
    }
})


export default H2;