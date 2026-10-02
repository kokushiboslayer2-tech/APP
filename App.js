import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import signup from './Screens/signupscreen';
import details from './Screens/detailsscreens';
import LoginScreen from './Screens/loginscreen';
import BottomTabs from './Screens/bottomtab';

import AddDevice from './Screens/AddDevice';
import Home from './Screens/Home';
import Sensorcontrol from './Screens/Sensorcontrol';
import DrawerScreen  from './Navigation/Drawer';
const Stack= createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name = "SignUp" component={signup}/>
         <Stack.Screen name = "details" component={details}/>
         <Stack.Screen name = "Login" component={LoginScreen}/>
        
        
         <Stack.Screen name ="AddDevice" component={AddDevice}/>
        
         <Stack.Screen name ="Sensorcontrol" component={Sensorcontrol}/>
           <Stack.Screen name="Drawer" component={DrawerScreen} options={{ headerShown: false }}></Stack.Screen>
        
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
