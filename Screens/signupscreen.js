import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function SignupScreen() {
    const [name, setname ] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [showPassword,setshowPassword] = useState(false)
    const navigation = useNavigation();
    // useEffect(()=>{
    //     const fetchuserdetails = async()=>{
    //         const saveadetails = await AsyncStorage.getItem('userDetails');
    //         if(saveadetails){
    //             navigation.replace('Details')
    //         }
    //     };
    //     fetchuserdetails();
    // },[]);
    const Submit = async()=>{
        if(!name || !email || !password){
          alert("ALL fields are REQUIRED");
          return;
        }
        const body = {name,email,password};
        await AsyncStorage.setItem('userDetails',JSON.stringify(body));
        alert("registered Successfully");
        navigation.replace('Login')
    }
  return (
    <View style={styles.container}>
        <View style = {styles.form}>
      <Text style = {styles.Heading}>SignUp</Text>
      <TextInput placeholder="name"
      value={name}
      onChangeText={setname} style = {styles.Input}/>
            <TextInput placeholder="email"
      value={email}
      onChangeText={setemail} style = {styles.Input}/>
      <View style = {styles.passwordcontainer}>
                <TextInput placeholder="password"
        value={password}
        secureTextEntry = {!showPassword}
        onChangeText={setpassword} style = {styles.PasswordInput}/>
        <TouchableOpacity onPress={()=>setshowPassword(!showPassword)}>
            <Ionicons name = {showPassword?'eye-off':'eye'}size={22}color="grey"/>
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress = {Submit} style = {styles.button}>
            <Text>SignUp</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#856767',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Input: {
    width: '80%',
     padding:10,
     borderWidth:2,
     borderRadius:15,
     marginTop:20,
     fontSize:15,
     fontWeight:"bold",
  },
  form: {
    height:500,
    width:400,
    borderRadius:20,
    borderWidth:2,
    alignItems:"center",
    padding:20,
    backgroundColor:'#aaf0c9'
  },
  Heading: {
    fontSize:23,
    fontWeight:"bold",
     
  },
  button: {
    width:'60%',
    alignItems:"center",
    justifyContent:"center",
    borderWidth:1,
    marginTop:15,
    padding:10,
    borderRadius:20,
    backgroundColor:'#f69697'
  },
  passwordcontainer: {
    flexDirection:'row',
     width: '80%',
     padding:10,
     borderWidth:2,
     borderRadius:15,
     marginTop:20,
     fontSize:15,
     fontWeight:"bold",
  },
  PasswordInput: {
    flex: 1,
    fontSize:15,
    fontWeight:'bold',
  }
  
});
