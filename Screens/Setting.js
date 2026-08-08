import React from "react";
import {View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Image, FlatList} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from "@expo/vector-icons";
const Stack = createStackNavigator();
const SettingOptions = [
  {id:'1', title:'Profile', screen:'Profile'},
  {id:'2', title:'About Us', screen:'About Us'},
  {id:'3', title:'Privacy Policy', screen:'Privacy Policy'},
  {id:'4', title:'FAQ', screen:'FAQ'},
  
]
const { width } = Dimensions.get('window');

const Setting = () => {
  const navigation =useNavigation();
    return (
      <ImageBackground source = {require('../assets/assets/images/Background.png')} style ={styles.background}>
        <View style={styles.container}>
        <View style ={styles.headers}>
          <TouchableOpacity onPress ={() => navigation.goBack()} style ={styles.backButton}>
            <Image source = {require('../assets/assets/images/A-1.png')} style={styles.backIcon}/>
          </TouchableOpacity>
        </View>
        <Text style ={styles.title}>
          Settings
        </Text>
        <View style={styles.FlatListContainer}>
          <FlatList 
          data ={SettingOptions}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style ={styles.optionButton} onPress={() => navigation.navigate(item.screen)}>
              <Text style ={styles.optionText}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}/>
        </View>
        <View style ={styles.separator}/>
        <TouchableOpacity onPress={async() => {await AsyncStorage.clear();
          navigation.navigate('Login')
        }}
        style={styles.logoutButton}>
          <MaterialIcons name ="logout" size={24} color="#F58084"/>
          <Text style ={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  headers: {
    flexDirection: 'row',
    width:'100%',
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  backButton:{
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop:20,
    backgroundColor:'#D1A0A7'
  },
  backIcon:{
    width:20,
    height:15,
  },
  title:{
    color:"white",
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom:20,
  },
  FlatListContainer:{
    width: '80%',
    alignSelf:'center',
    flexGrow: 0,
  },
  optionButton:{
    backgroundColor:"white",
    paddingVertical:15,
    paddingHorizontal:20,
    borderRadius:15,
    alignItems: 'center',
    marginVertical:8,
    elevation:5,
    shadowColor: '#000',
    shadowOffset:{width:0, height:2},
    shadowOpacity: 0.3,
    shadowRadius:10,
  },
  optionText:{
    color: "black",
    fontWeight: '600',
    fontSize: 18,
  },
  separator: {
    width:'80%',
    height:2,
    backgroundColor: "Black",
    marginVertical:20,
  },
  logoutButton:
  {
    flexDirection:'row',
    alignItems: 'center',
    padding:12,
    borderRadius:10,
    backgroundColor: "white",
    elevation:5,
    shadowColor: '#000',
    shadowOffset:{width:0, height:2},
    shadowOpacity: 0.3,
    shadowRadius:10,
  },
  logoutText:{
    fontWeight:'Bold',
    fontSize: 16,
    color: '#F58084',
    marginLeft: 5,
  },
});
export default Setting;