import { StyleSheet, Text } from 'react-native';


const Small = (props) => {
    return (
        <Text style={{...styles.small, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    small: {
        fontFamily: 'WorkSans_500Medium',
        fontSize: 14
    }
})


export default Small;