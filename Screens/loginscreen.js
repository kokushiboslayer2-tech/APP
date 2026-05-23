import React, { useRef, useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get("window");

const LoginScreen = (props) => {
    const [username, setUsername] = useState({ value: 'anurag.mscint230301001', error: '' });
    const [password, setPassword] = useState({ value: 'an@12345', error: '' });

    // const handleLogin = async () => {
    //     try {
    //         const apiUrl = 'https://moonhub.moonpreneur.com/LMSService/api/Account/GetUserTokenForIOTApp';
    //         const response = await fetch(apiUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Security-key': 'IOI2R-RO1WTR-PMQWRT-PRS70-L2TPN',
    //             },
    //             body: JSON.stringify({
    //                 userName: username.value,
    //                 password: password.value,
    //                 ipAddress: '127.0.0.1',
    //                 rememberMe: true,
    //             }),
    //         });

    //         if (!response.ok) {
    //             console.error(`HTTP error! Status: ${response.status}`);
    //             return;
    //         }

    //         const result = await response.json();

    //         if (result.statusCode === 200 && result.result && result.result.length > 0) {
    //             await AsyncStorage.setItem('loginResponse', JSON.stringify(result));
    //             console.log(result);
    //             props.navigation.navigate("MainApp");
    //         } else {
    //             console.error("Login failed");
    //         }
    //     } catch (error) {
    //         console.error("Error during login:", error);
    //     }
    // };


    return (
<ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Login</Text>
    
  </View>


  <View style={styles.formContainer}>
    
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
      />
      {username.error ? <Text style={styles.errorText}>{username.error}</Text> : null}
    </View>


    <View style={styles.inputWrapper}>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
      />
      {password.error ? <Text style={styles.errorText}>{password.error}</Text> : null}
    </View>

 
    <TouchableOpacity onPress={() => props.navigation.navigate('ResetPasswordScreen')} style={styles.forgotPassword}>
      <Text style={styles.forgot}>Forgot your password?</Text>
    </TouchableOpacity>


    <TouchableOpacity onPress = {()=> navigation.navigate('MainScreen')}style={styles.loginButton} activeOpacity={0.9}>
      <Text style={styles.loginText}>Login</Text>
    </TouchableOpacity>

  
    <View style={styles.row}>
      <Text style={styles.signupText}>Don’t have an account?</Text>
      <TouchableOpacity onPress={() => props.navigation.replace('SignUp')}>
        <Text style={styles.link}> Sign up</Text>
      </TouchableOpacity>
    </View>
  </View>
</ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    backgroundColor: '#f9f9f9',
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20,
  },
  headerText: {
    fontSize: 32,
    color: '#0f2051',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lottieAnimation: {
    width: 260,
    height: 260,
  },
  formContainer: {
    backgroundColor: '#527ff4',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#0f2051',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#f9f9f9',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#ffffff20',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#ffffff30',
  },
  errorText: {
    color: '#f44336',
    fontSize: 13,
    marginTop: 4,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  forgot: {
    color: '#f9f9f9',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#0f2051',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0f2051',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  loginText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  signupText: {
    color: '#f9f9f9',
    fontSize: 15,
  },
  link: {
    color: '#0f2051',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default LoginScreen
