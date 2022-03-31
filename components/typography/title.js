import { StyleSheet, Text } from 'react-native';


const Title = (props) => {
    return (
        <Text style={{...styles.h1, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    h1: {
        fontFamily: 'WorkSans_700Bold',
        fontSize: 64,
        letterSpacing: -2
    }
});


export default Title;