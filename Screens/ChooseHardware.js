import React, { useState, useEffect } from "react";
import {View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get('window');

const ChooseHardware = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [hardwaresResponse, setHardwaresResponses] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedLoginResponse = await AsyncStorage.getItem('loginResposne');
        if (storedLoginResponse) {
          const parsedResponse = JSON.parse(storedLoginResponse);
          return parsedResponse.result[0].token;
        }
      } catch (error) {
        console.error('Error retriving Token:', error);
      }
    };

    const fetchData = async () => {
      const apiToken =await fetchToken();
      if (!apiToken) return;

      try {
        const response = await fetch('https://moonhub.moonpreneur.com/LMSService/api/IOT/GetHardwares', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${apiToken}` },
        });

        const result = await response.json();
        if (result.statusCode === 200 && !result.isError) {
          setHardwaresResponses(result.result);
        } else {
          console.error('Failed to fetch Devices:', result.message);
        }
      } catch (error) {
        console.error('Error fecthing devices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style ={styles.background}>

      <Text style={styles.title}>Choose Hardware</Text>


      {isLoading ? (
        <ActivityIndicator color={'white'} size="Large" style={{ marginTop: 20}}/>
      ) : (

        <FlatList
          data={hardwaresResponse}
          keyExtractor={(item) => item.hardware_id}
          contentContainerStyle={styles.hardwareList}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.hardwareItem}
              onPress={() => navigation.navigate('AddDevice', { data: item.hardware_name, h_id: item.hardware_id })
            }
            >
              <Image source={{ uri: item.hardware_image }} style={styles.hardwareImage} />
              <View style={styles.hardwareTextContainer}>
                <Text style={styles.hardwareName}>{item.hardware_name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:24,
  },
  title: {
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
});
export default ChooseHardware;