import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function DetailsScreens() {
    const [user,setUser]=useState(null);
    useEffect(()=>{
        const getData = async()=>{
            const data = await AsyncStorage.getItem('userDetails');
            if(data){
                setUser(JSON.parse(data));
            }
        };
        getData();
    },[]);
    if(!user)
        return null;
  return (
    <View style={styles.container}>
      <Text style= {styles.userDetail}>user Details</Text>
      <Text style= {styles.userName}>Name:{user.name}</Text>
      <Text style= {styles.userName}>Email:{user.email}</Text>
      <StatusBar style="auto" />
    </View>
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
