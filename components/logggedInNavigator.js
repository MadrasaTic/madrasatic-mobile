import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/profile';

const Tab = createBottomTabNavigator();

// This is the second navigator we will use, it will serve as the bottom Tab navigator
// This navigator won't be accessed until the user is logged in

const LoggedInNavigator = ({ navigation }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
};

export default LoggedInNavigator;