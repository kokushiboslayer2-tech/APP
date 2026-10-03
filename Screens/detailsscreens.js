import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ImageBackground } from 'react-native-web';
export default function DetailsScreens({navigation,route}) {
  const {screenName, device1} = route.params;
    const [screen,setScreen] = useState(screenName);
    const [responses,setResponses] = useState([]);
    const [token,setToken] = useState('');
    const device = screen === 'AddDevice'?responses:device1;
    useEffect(() => {
      fetchToken();
    },[]);
    const fetchToken = async() => {
      try{
        const storeResponses = await AsyncStorage.getItem('loginResponse');
        if(storeResponses) {
          const parsedResponse = JSON.parse(storeResponses);
          const newToken = parsedResponse.result[0].token;
          setToken(newToken);
        }
      }
      catch(error){
        console.error('Error Retreving Token from AsyncStorage:',error);
      }
    }
    const Handledelete = async () => {
      Alert.alert('Confirm Delete?','Are You sure?? (:/)', 
        [{text:'Cancel', style:'cancel'}, 
          {text:'Delete', onPress: async() => {
            try{
              const response = await axios.post(`https://moonhub.moonpreneur.com/LMSService/api/IOT/DeleteDeviceById?user_device_id=${device.user_device_id}`,{},
                {headers:{Authorization:`Bearer ${token}`}}
              ); 
              if(response.status === 200){
                navigation.navigate('Drawer')
              }
            }
            catch(error){
              console.error('Failed to Delete Device:',error)
            }
          }}
        ]
      )
    }
  return (
    <ImageBackground source = {require('../assets/assets/images/Background.png')}></ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetail: {
    fontWeight: 'bold',
    fontSize:20,
    marginBottom:15
  },
  userName: {
        fontWeight: 'bold',
    fontSize:16
  },
});
