import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import signup from './Screens/signupscreen';
import details from './Screens/detailsscreens';
import LoginScreen from './Screens/loginscreen';
import BottomTabs from './Screens/bottomtab';

const Stack= createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name = "SignUp" component={signup}/>
         <Stack.Screen name = "Details" component={details}/>
         <Stack.Screen name = "Login" component={LoginScreen}/>
         <Stack.Screen name ="MainScreen" component={BottomTabs}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#685959',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
