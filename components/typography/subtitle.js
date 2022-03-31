import { StyleSheet, Text } from 'react-native';


const Subtitle = (props) => {
    return (
        <Text style={{...styles.subtitle, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    subtitle: {
        fontFamily: 'WorkSans_500Medium',
        fontSize: 24
    }
})


export default Subtitle;