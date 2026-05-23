import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, RefreshControl, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from "react-native";

const Home = () => {

  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [devicesResponse, setDevicesResponse] = useState(null);
  const [token, setToken] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) {
      fetchData();
      console.log('focused')
    }
  }, [isFocused]);

  const fetchToken = async () => {
    try {
      const storedLoginResponse = await AsyncStorage.getItem('loginResponse');
      if (storedLoginResponse) {
        const parsedResponse = JSON.parse(storedLoginResponse);
        const newToken = parsedResponse.result[0].token;
        const name = parsedResponse.result[0].student_name;
        setToken(newToken);
        setUser(name)
        return newToken;
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
  };

  const fetchDevices = async (apiToken) => {
    console.log(apiToken)
    try {
      const apiURL = 'https://moonhub.moonpreneur.com/LMSService/api/IOT/GetDevices';

      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active_filter: 1}),
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.statusCode === 200 && !result.isError) {
        setDevicesResponse(result.result);
      } 
      else {
        console.error('Failed to fetch devices:', result.message);
      }
    } catch (error) {
      console.error('Error during fetching devices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    const newToken = await fetchToken();
    console.log('Token below');
    console.log(newToken);
    if (newToken) {
      fetchDevices(newToken);
  }
};
const deviceImages = [
  require('../assets/assets/AppIcons/Fan.png'),
  require('../assets/assets/AppIcons/AC.png'),
  require('../assets/assets/AppIcons/Bulb.png'),
  require('../assets/assets/AppIcons/Speaker.png'),
  require('../assets/assets/AppIcons/Charging.png'),
  require('../assets/assets/AppIcons/smart door.png'),
  require('C:\Users\shubh\TodoLIST\assets\assets\AppIcons\tv.png'),
  require('../assets/assets/AppIcons/security system.png'),
  require('../assets/assets/AppIcons/robotvaccum.png'),
  require('../assets/AppIcons/Others.png'),
];

const renderItem = ({ item }) => (
  <DeviceInfo
    device_id={item.device_id}
    device_name={item.device_name}
    user_device_name={item.user_device_name}
    device_connection_type={item.connection_type}
    device_hardware={item.hardware_name}
    lastConnected={item.created_on}
    item={item}
    device_status={item.device_status}
    image_url={item.image_url}
  />
);
const DeviceInfo = ({
  device_id,
  user_device_name,
  device_connection_type,
  device_hardware,
  lastConnected,
  item,
  device_status,
}) => (
  <TouchableOpacity style={styles.deviceInfoContainer}
    onPress={() => {
      props.navigation.navigate("DeviceDetail", { screenName: 'Home', deviceI: item, param3: token });
      console.log(item)
      console.log(device_hardware);
    }}
  >
      <View style={styles.deviceInfoContent}>
      <Image source={deviceImages[device_id]} style={styles.deviceImage} />
      <View style={{ justifyContent: 'center', marginTop: 6 }}>
        <View>
          <Text style={styles.deviceNameText}>
            {user_device_name}
          </Text>
          <Text style={styles.deviceLastConnectedText}>
            {lastConnected}
          </Text>
        </View>
        <Text style={styles.deviceConnectionText}>
          {device_connection_type}
        </Text>
      </View>
    </View>
    {device_status == "Connected" ? <View
      style={styles.statusConnected}>
    </View> : <View
      style={styles.statusDisconnected}>
    </View>}
    <View style={styles.deviceActionIcon}>
      <Image source={require('../assets/pl.png')} style={styles.deviceActionImage} />
    </View>
  </TouchableOpacity>
);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9', }} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>
               Welcome Home,
            </Text>
            <Text style={styles.userNameText}> {user} </Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <View>
          <Text style={styles.boxText}>
            Start Controlling Your Devices
          </Text>
          <View style={styles.boxButton}>
            <Text style={styles.boxButtonText}>Let's go!</Text>
          </View>
        </View>
        <Image
          source={require('../assets/assets/images/nodata.png')}
          style={styles.boxImage}
        />
      </View>
      <View style={styles.addedDevicesHeaderContainer}>
        <Text style={styles.addedDevicesText}>Added Devices</Text>
      </View>
    </ScrollView>  
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:24,
  },
  Home: {
    fontSize:24,
    fontWeight: '600',
    color: '#0f2051',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: width * 0.8,
  },
  headerContainer: {
    flexDirection:'row',
    paddingHorizontal: 10,
  },
  headerContent: {
    width: '85%',
    marginTop: 50,
  },
  welcomeTextContainer: {
    width: "90%",
    marginTop: 30,
    marginLeft:10
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0f2051"
  },
  userNameText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f2051"
  },
  box: {
    flexDirection: "row",
    backgroundColor: '#527ff4',
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 20,
    paddingLeft: 30,
    shadowColor: "#0f2051",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  },
  boxText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    width: 250,
    paddingRight: 80
  },
  boxButton: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 20,
    width: 130,
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10
  },
  boxButtonText: {
    color: "Black",
    fontWeight: "bold",
    fontSize: 18,
    AlignSelf: 'center',
  },
  boxImage: {
    marginLeft: -70,
    marginTop: 50,
    height:80,
    width:160
  },
  addedDevicesHeaderContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  addedDevicesText: {
    color: '#0f2051',
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
  },
});   

export default Home;

