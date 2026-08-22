import { StyleSheet, Text, View, Clipboard, Alert, ImageBackground, TouchableOpacity, Image, BackHandler, ActivityIndicator } from 'react-native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
// import { Value } from 'react-native/types_generated/Libraries/Animated/AnimatedExports';
const Stack = createStackNavigator();

export default function Profile() {
    const[name,setname] = useState('N/A');
    const[email,setemail] = useState('N/A');
    const[mobile,setmobile] = useState('N/A');
    const[securitytoken,setsecuritytoken] = useState('N/A');
    const[token,settoken] = useState(null);
    const[isloading,setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        fetchToken().then((value) => {
            if(value){
                fetchUserProfile(value);
            }
        });
        loadprofilefromstorage(

        );
    },[]);
    const loadprofilefromstorage = async() => {
        try{
            const storedName = await AsyncStorage.getItem('UserName')||'N/A';
            const storedEmail = await AsyncStorage.getItem('Email')||'N/A';
            const storedMobile = await AsyncStorage.getItem('Mobile')||'N/A';
            const storedSecurityToken = await AsyncStorage.getItem('securityToken')||'N/A';
            setname(storedName);
            setemail(storedEmail);
            setmobile(storedMobile);
            setsecuritytoken(storedSecurityToken);
            setLoading(false);
        }
        catch(error){
            console.error('error loading profile:',error);
        }
    };
    const fetchToken = async() => {
        try{
            const storedLoginResponse = await AsyncStorage.getItem('Login Response');
            if(!storedLoginResponse) return null;
            const parsedResponse = JSON.parse(storedLoginResponse);
            const newToken = parsedResponse?.result?.[0]?.token;
            settoken(newToken);
            return newToken;
        }catch(error){
            console.error('error Retrieving Token:', error);
            return null;
        }
    }
    const fetchUserProfile = async(token) => {
        if(!token)return;
        try{
            const url = 'https://test.moonr.com/LMSService/api/IOT/UserProfile';
            const Response = await fetch(url,{
                method:'GET',
                headers:{'Authorization':`Bearer${token}`},
            });
            if(Response.status === 200){
                const data = await Response.json();
                const UserProfile = data?.result?.[0];
                setname(UserProfile?.name || 'N/A');
                setemail(UserProfile?.email || 'N/A');
                setmobile(UserProfile?.mobile || 'N/A');
                setsecuritytoken(UserProfile?.security_token || 'N/A');
                setLoading(false);



            }
            else{
                console.error('Failed to fetch the user profile:', Response.status);
            }
        }
        catch(error){
            console.error('Error fetching the profile:', error);

        }
    }
    const copytoclipboard = () => {
        Clipboard.setString(securitytoken);
        Alert.alert('copied','securitytoken has been copied to Clipboard');
    }

  return (
    <ImageBackground source = {require('../assets/assets/images/Background.png')} style = {{width:'100%', height: '100%'}}>
        <View style = {{flex:1, alignItems: 'center',}}>
            <View style = {styles.headerContainer}>
                <TouchableOpacity style = {styles.backButton}>
                    <Image source = {require('../assets/assets/images/backIcon.png')} style = {styles.backIcon}/>
                </TouchableOpacity>
            </View>
            <Text style = {styles.profile}>Profile</Text>
            {isloading?(
                <ActivityIndicator size="large" color="white" />
            ):(
                <View style = {styles.Container}>
                    <View style = {styles.box}>
                        <Text style = {styles.Text}>Name:{name}</Text>
                    </View>

                    <View style ={styles.box}>
                        <Text style = {styles.Text}>email:{email}</Text>
                    </View>

                    <View style ={styles.box}>
                        <Text style = {styles.Text}>Mobile:{mobile}</Text>
                    </View>

                    <View style={styles.tokenContainer}>
                        <Text style = {styles.Text}> Security Token</Text>
                        <TouchableOpacity style={styles.button} onPress={copytoclipboard}>
                            <Text style = {styles.tokenText}>{securitytoken}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection:'row',
    width: '100%',
    paddingHorizontal:20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: '#d1a0a7',
  },
  backIcon: {
    height: 15,
    width: 20,
  },
  Container: {
    width:'100%',
    alignItems: 'center',
  },
  box:{
    backgroundColor:'white',
    borderRadius: 20,
    padding:15,
    width:'85%',
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  Text:{
    color:'black',
    fontSize: 18
  },
  tokenContainer: {
    backgroundColor:'#f5f5f5',
    padding:10,
    marginTop:20,
    width:'85%',
    borderRadius:20,
  },
  tokenText:{
    color:'green',
    fontSize: 18,
    textDecorationLine: 'underline',
  }
 
});