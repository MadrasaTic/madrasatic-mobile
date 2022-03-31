import { StyleSheet, Text } from 'react-native';


const Body = (props) => {
    return (
        <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
    );
}


const styles = StyleSheet.create({
    body: {
        fontFamily: 'WorkSans_500Medium',
        fontSize: 16
    }
})


export default Body;