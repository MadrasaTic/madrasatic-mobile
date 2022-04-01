import { StyleSheet, Text } from 'react-native';


const H3 = (props) => {
    return (
        <Text style={{...styles.h3, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    h3: {
        fontFamily: 'WorkSans_700Bold',
        fontSize: 24,
        letterSpacing: -1
    }
})


export default H3;