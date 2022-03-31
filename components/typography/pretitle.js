import { StyleSheet, Text } from 'react-native';


const Pretitle = (props) => {
    return (
        <Text style={{...styles.pretitle, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    pretitle: {
        fontFamily: 'WorkSans_700Bold',
        fontSize: 10,
        letterSpacing: 3
    }
})


export default Pretitle;